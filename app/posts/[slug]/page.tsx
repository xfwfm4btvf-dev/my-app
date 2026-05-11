import { Metadata } from "next";
import { getPostBySlug, posts } from "../../../lib/posts";
import PostContent from "./PostContent";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Nitrogen Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: { title: post.title, description: post.excerpt, url: `https://xfwfm4btvf-dev.github.io/my-app/posts/${post.slug}`, type: "article", publishedTime: post.date, tags: post.tags },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

function getReadingTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-400">Post not found: {slug}</p></div>;

  const readingTime = getReadingTime(post.content);
  const postIndex = posts.findIndex((p) => p.slug === post.slug);
  const prevPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? posts[postIndex - 1] : null;

  const jsonLd = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: post.title, description: post.excerpt, datePublished: post.date, dateModified: post.date,
    author: { "@type": "Person", name: "Henry Nitrogen", url: "https://xfwfm4btvf-dev.github.io/my-app/about" },
    publisher: { "@type": "Organization", name: "Nitrogen Blog", url: "https://xfwfm4btvf-dev.github.io/my-app/" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://xfwfm4btvf-dev.github.io/my-app/posts/${post.slug}` },
    keywords: post.tags.join(", "), wordCount: post.content.trim().split(/\s+/).length, articleSection: post.tags[0] || "Technology",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PostContent post={post} readingTime={readingTime} prevPost={prevPost} nextPost={nextPost} />
    </>
  );
}
