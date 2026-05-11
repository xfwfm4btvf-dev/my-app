'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00d4ff' },
    background: { default: '#0a0a0a', paper: '#1a1a2e' },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static" sx={{ bgcolor: 'background.paper' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Nitrogen</Link>
              </Typography>
              <Button color="inherit" component={Link} href="/">Home</Button>
              <Button color="inherit" component={Link} href="/posts">Posts</Button>
              <Button color="inherit" component={Link} href="/tags">Tags</Button>
              <Button color="inherit" component={Link} href="/about">About</Button>
            </Toolbar>
          </AppBar>
          <Box component="main" sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: 'background.default' }}>
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}