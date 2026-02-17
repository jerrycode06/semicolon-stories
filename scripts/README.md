# Dev.to Migration Script

This script automatically migrates your articles from Dev.to to your personal blog.

## How It Works

The script uses the Dev.to public API to:

1. Fetch all your published articles
2. Download the full markdown content
3. Convert the frontmatter to match your blog's format
4. Save each article as a `.md` file in `src/content/posts/`

## Usage

Run the migration script with your Dev.to username:

```bash
npm run migrate <your-devto-username>
```

**Example:**

```bash
npm run migrate nikhilupadhyay
```

## What Gets Migrated

For each article, the script migrates:

- ✅ Title
- ✅ Publication date
- ✅ Description/excerpt
- ✅ Tags
- ✅ Cover image URL
- ✅ Full markdown content
- ✅ Original Dev.to link (added as a note)

## After Migration

Once the migration completes:

1. **Review the files** - Check `src/content/posts/` for your migrated articles
2. **Download images** (optional) - If you want to host images locally instead of using external URLs:
   - Download cover images to your `public` folder
   - Update the `coverImage` paths in the frontmatter
   - Download any inline images and update their URLs
3. **Check formatting** - Some Dev.to-specific formatting might need adjustment
4. **Test locally** - Run `npm run dev` to preview your migrated posts

## Notes

- The script adds a small delay between API requests to be respectful to Dev.to's servers
- Original Dev.to URLs are preserved in each post
- The script will skip articles that fail to download and continue with the rest
- No API key is required - it uses Dev.to's public API

## Troubleshooting

**"No articles found"**

- Double-check your Dev.to username
- Ensure you have published articles on Dev.to

**"Failed to fetch article"**

- This might be a temporary API issue
- Try running the script again

**Images not loading**

- External images should work fine
- If you want local images, download them manually to the `public` folder
