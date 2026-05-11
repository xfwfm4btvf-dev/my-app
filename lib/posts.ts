export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'mastering-typescript',
    title: 'Mastering TypeScript: A Guide to Better JavaScript',
    excerpt: 'TypeScript has become the gold standard for building robust web applications.',
    date: '2026-05-10',
    tags: ['TypeScript', 'JavaScript'],
    content: `# Mastering TypeScript\n\nTypeScript has become the gold standard for building robust web applications.`
  },
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 16',
    excerpt: 'Next.js 16 brings exciting new features.',
    date: '2026-05-08',
    tags: ['Next.js', 'React'],
    content: `# Getting Started with Next.js 16\n\nNext.js continues to evolve with powerful new features.`
  },
  {
    slug: 'ai-powered-development',
    title: 'AI-Powered Development Tools',
    excerpt: 'How AI assistants are transforming the way we write code.',
    date: '2026-05-05',
    tags: ['AI', 'Productivity'],
    content: `# AI-Powered Development Tools\n\nArtificial intelligence is revolutionizing software development.`
  },
  {
    slug: 'web-security-essentials',
    title: 'Web Security Essentials for Modern Apps',
    excerpt: 'Security is not optional. Learn the essential practices.',
    date: '2026-05-01',
    tags: ['Security', 'Web'],
    content: `# Web Security Essentials\n\nSecurity must be a priority from day one.`
  }
];

export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags);
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter(post => post.tags.includes(tag));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}