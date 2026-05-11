'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Post } from '../../../lib/posts';

export default function PostContent({ post }: { post: Post }) {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h3" gutterBottom>{post.title}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>{post.date}</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
          {post.tags.map((tag) => <Chip key={tag} label={tag} size="small" />)}
        </Box>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{post.content}</Typography>
      </Paper>
    </Container>
  );
}