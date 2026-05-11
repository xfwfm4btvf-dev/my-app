'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '../../lib/posts';

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>Tags</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {tags.map((tag) => {
          const tagPosts = getPostsByTag(tag);
          return (
            <Card key={tag} sx={{ bgcolor: 'background.paper', flex: '1 1 300px', minWidth: 300 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>{tag}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{tagPosts.length} posts</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {tagPosts.map((post) => (
                    <Chip key={post.slug} label={post.title} component={Link} href={`/posts/${post.slug}`} clickable size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
}