import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { getPostBySlug } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { SEO } from "@/components/SEO";

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <Layout>
        <SEO title="Post Not Found" description="The post you're looking for doesn't exist." />
        <div className="container mx-auto max-w-3xl px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p className="mt-2 text-muted-foreground">
            The post you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to posts
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={post.tags}
        url={`/post/${post.slug}`}
        type="article"
        publishedTime={post.date}
      />
      <article className="container mx-auto max-w-3xl px-4 py-12">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to posts
        </Link>

        {/* Header */}
        <header className="mt-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">{post.title}</h1>

          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-mono text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mt-8 overflow-hidden rounded-lg border border-border">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Divider */}
        <hr className="my-8 border-border" />

        {/* Content */}
        <section>
          <MarkdownRenderer content={post.content} />
        </section>
      </article>
    </Layout>
  );
};

export default Post;
