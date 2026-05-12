"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import Link from "next/link";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#ce93d8" },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <AppBar position="sticky" color="default" elevation={1}>
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  component={Link}
                  href="/"
                  sx={{
                    flexGrow: 1,
                    textDecoration: "none",
                    color: "primary.main",
                    fontWeight: "bold",
                  }}
                >
                  Nitrogen
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button component={Link} href="/" color="inherit">
                    Home
                  </Button>
                  <Button component={Link} href="/posts" color="inherit">
                    Posts
                  </Button>
                  <Button component={Link} href="/tags" color="inherit">
                    Tags
                  </Button>
                  <Button component={Link} href="/about" color="inherit">
                    About
                  </Button>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
