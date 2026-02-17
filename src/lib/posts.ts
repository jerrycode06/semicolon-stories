export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage: string;
  content: string;
  readingTime: number;
}

// Import all markdown files
const postModules = import.meta.glob('/src/content/posts/*.md', { 
  eager: true, 
  query: '?raw',
  import: 'default' 
});

function parseMarkdown(content: string): { metadata: Record<string, any>; body: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, body: content };
  }
  
  const [, frontmatter, body] = match;
  const metadata: Record<string, any> = {};
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Remove quotes
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1);
        metadata[key] = value.split(',').map(item => 
          item.trim().replace(/"/g, '')
        );
      } else {
        metadata[key] = value;
      }
    }
  });
  
  return { metadata, body: body.trim() };
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];
  
  for (const [path, content] of Object.entries(postModules)) {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { metadata, body } = parseMarkdown(content as string);
    
    posts.push({
      slug,
      title: metadata.title || 'Untitled',
      date: metadata.date || '',
      excerpt: metadata.excerpt || '',
      tags: metadata.tags || [],
      coverImage: metadata.coverImage || '',
      content: body,
      readingTime: calculateReadingTime(body)
    });
  }
  
  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(post => post.slug === slug);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
