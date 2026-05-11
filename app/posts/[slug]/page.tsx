import { getPostBySlug, posts } from "../../../lib/posts";
import PostContent from "./PostContent";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-400">Post not found</p>
      </div>
    );
  }

  return <PostContent post={post} />;
}