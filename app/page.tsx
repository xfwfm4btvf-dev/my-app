'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { posts } from '../lib/posts';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" gutterBottom>Welcome to Nitrogen</Typography>
        <Typography variant="h5" color="text.secondary">Exploring tech, code, and the future</Typography>
      </Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>Latest Posts</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {posts.slice(0, 3).map((post) => (
          <Card key={post.slug} sx={{ bgcolor: 'background.paper', flex: '1 1 300px', minWidth: 300 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>{post.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{post.excerpt}</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                {post.tags.map((tag) => <Chip key={tag} label={tag} size="small" />)}
              </Box>
              <Button size="small" component={Link} href={`/posts/${post.slug}`}>Read More</Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}