import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getPostBySlug, posts } from '../../../lib/posts';
import PostContent from './PostContent';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return <Container sx={{ py: 8 }}><Typography>Post not found</Typography></Container>;
  return <PostContent post={post} />;
}