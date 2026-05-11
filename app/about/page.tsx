'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h3" gutterBottom>About</Typography>
        <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>Henry Nitrogen</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Hello! I&apos;m Henry Nitrogen, a web developer and student based in Hong Kong and Zhuhai.
          I&apos;m passionate about coding, AI, blockchain, and cybersecurity.
        </Typography>
        <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>Skills & Interests</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
          {['Next.js', 'TypeScript', 'Python', 'Solana', 'AI', 'Blockchain', 'Security'].map((skill) => (
            <Chip key={skill} label={skill} />
          ))}
        </Box>
        <Typography variant="h6" gutterBottom>Contact</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>Email: henryni710@gmail.com</Typography>
        <Typography variant="body1">
          GitHub: <Link href="https://github.com/HenryNitrogen" style={{ color: '#00d4ff' }}>github.com/HenryNitrogen</Link>
        </Typography>
      </Paper>
    </Container>
  );
}