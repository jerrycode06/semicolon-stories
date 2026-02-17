import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  author?: string;
}

const SITE_NAME = "Semicolon Stories | Software Engineering, Web & AI by Nikhil Upadhyay";
const DEFAULT_DESCRIPTION = "Semicolon Stories is a technical blog by Nikhil Upadhyay covering Software Engineering, Web Development, TypeScript, React, AI, AI Agents, System Design, and modern engineering practices.";
const DEFAULT_IMAGE = "/logo.png";
const SITE_URL = "https://semicolonstories.me/"; // Update this when you have a custom domain

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  image = DEFAULT_IMAGE,
  url = "",
  type = "website",
  publishedTime,
  author = "Nikhil Upadhyay",
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullUrl = `${SITE_URL}${url}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  const jsonLd = type === "article" 
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        image: fullImage,
        author: {
          "@type": "Person",
          name: author,
        },
        publisher: {
          "@type": "Person",
          name: author,
        },
        datePublished: publishedTime,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": fullUrl,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        description,
        url: SITE_URL,
        author: {
          "@type": "Person",
          name: author,
        },
      };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@yourhandle" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
