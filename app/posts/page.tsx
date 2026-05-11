'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { posts } from '../../lib/posts';

export default function PostsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>All Posts</Typography>
      {posts.map((post) => (
        <Card key={post.slug} sx={{ bgcolor: 'background.paper', mb: 2 }}>
          <CardContent>
            <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6">{post.title}</Typography>
            </Link>
            <Typography variant="body2" color="text.secondary">{post.date}</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              {post.tags.map((tag) => <Chip key={tag} label={tag} size="small" />)}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}