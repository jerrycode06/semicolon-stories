import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  tag_list: string | string[]; // Can be string or array depending on API endpoint
  body_markdown: string;
  slug: string;
  cover_image?: string;
  canonical_url?: string;
}

async function fetchDevToArticles(username: string): Promise<DevToArticle[]> {
  console.log(`Fetching articles for user: ${username}...`);

  const response = await fetch(
    `https://dev.to/api/articles?username=${username}&per_page=1000`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.statusText}`);
  }

  const articles = await response.json();
  console.log(`Found ${articles.length} articles`);

  return articles;
}

async function fetchArticleDetails(articleId: number): Promise<DevToArticle> {
  const response = await fetch(`https://dev.to/api/articles/${articleId}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch article ${articleId}: ${response.statusText}`,
    );
  }

  return await response.json();
}

function sanitizeSlug(slug: string): string {
  // Remove any special characters and ensure it's a valid filename
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function convertToLocalMarkdown(article: DevToArticle): string {
  // Parse tags - handle both string and array formats
  let tags: string[];
  if (typeof article.tag_list === "string") {
    // If it's a string, split by comma and trim
    tags = article.tag_list
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  } else {
    // If it's already an array, use it directly
    tags = article.tag_list;
  }

  const frontmatter = `---
title: "${article.title.replace(/"/g, '\\"')}"
date: "${new Date(article.published_at).toISOString().split("T")[0]}"
excerpt: "${article.description.replace(/"/g, '\\"')}"
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]${article.cover_image ? `\ncoverImage: "${article.cover_image}"` : ""}
---

`;

  // Add a note about the original source
  const sourceNote = `> **Note:** This article was originally published on [DEV.to](${article.canonical_url}).\n\n`;

  return frontmatter + sourceNote + article.body_markdown;
}

async function migrateArticles(username: string, outputDir: string) {
  try {
    // Fetch all articles
    const articles = await fetchDevToArticles(username);

    if (articles.length === 0) {
      console.log("No articles found!");
      return;
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`\nMigrating ${articles.length} articles...\n`);

    for (const article of articles) {
      try {
        // Fetch full article details (includes body_markdown)
        console.log(`Fetching details for: ${article.title}`);
        const fullArticle = await fetchArticleDetails(article.id);

        // Create filename from slug
        const filename = sanitizeSlug(fullArticle.slug) + ".md";
        const filepath = path.join(outputDir, filename);

        // Convert to local markdown format
        const markdown = convertToLocalMarkdown(fullArticle);

        // Write to file
        fs.writeFileSync(filepath, markdown, "utf-8");
        console.log(`✓ Migrated: ${filename}`);

        // Be nice to the API - add a small delay
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error(`✗ Failed to migrate "${article.title}":`, errorMessage);
      }
    }

    console.log(
      `\n✅ Migration complete! ${articles.length} articles saved to ${outputDir}`,
    );
    console.log("\nNext steps:");
    console.log("1. Review the migrated markdown files");
    console.log("2. Check if images need to be downloaded locally");
    console.log("3. Adjust any formatting if needed");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

// Main execution
const username = process.argv[2];

if (!username) {
  console.error("Usage: npm run migrate <dev.to-username>");
  console.error("Example: npm run migrate yourusername");
  process.exit(1);
}

const outputDir = path.join(__dirname, "..", "src", "content", "posts");
migrateArticles(username, outputDir);
