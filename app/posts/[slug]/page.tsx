import { getPostBySlug, posts } from "../../../lib/posts";
import PostContent from "./PostContent";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Post not found: {slug}</p>
      </div>
    );
  }

  return <PostContent post={post} />;
}