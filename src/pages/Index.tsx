import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PostCard } from "@/components/PostCard";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";

const Index = () => {
  const posts = getAllPosts();
  const allTags = getAllTags();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  return (
    <Layout>
      <SEO
        title="Home"
        description="A software engineering blog about web development, TypeScript, React, and modern development practices."
        keywords={[
          "software engineering",
          "web development",
          "TypeScript",
          "React",
          "JavaScript",
        ]}
        url="/"
      />
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <section className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Hey, I'm Nikhil 👋
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            I write code. Sometimes it works. Sometimes it teaches me something. <br />
            Here I share stories about software engineering, React, TypeScript,
            AI, and the tiny semicolons that shape big systems. <br />
            Welcome to Semicolon Stories.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">
            Latest Posts
          </h2>

          {/* Tag Filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Badge
              variant={selectedTag === null ? "default" : "outline"}
              className="cursor-pointer font-mono text-xs transition-colors hover:bg-primary/90"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Badge>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer font-mono text-xs transition-colors hover:bg-primary/90"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="space-y-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No posts found for this tag.
              </p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
