"use client";
import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Tooltip } from "@mui/material";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import Link from "next/link";
import { SearchDialog } from "./SearchDialog";

export default function MUIProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<string>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("mui-mode");
    if (saved === "light" || saved === "dark") {
      setMode(saved);
    }
  }, []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: mode === "light" ? "light" : "dark",
      ...(mode === "dark"
        ? { primary: { main: "#90caf9" }, secondary: { main: "#ce93d8" } }
        : { primary: { main: "#1976d2" }, secondary: { main: "#9c27b0" } }),
    },
  }), [mode]);

  const toggleTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("mui-mode", newMode);
  };

  return (
    <ThemeProvider theme={theme}>
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
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button component={Link} href="/" color="inherit">Home</Button>
              <Button component={Link} href="/posts" color="inherit">Posts</Button>
              <Button component={Link} href="/tags" color="inherit">Tags</Button>
              <Button component={Link} href="/about" color="inherit">About</Button>
              {mounted && (
                <Tooltip title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
                  <IconButton onClick={toggleTheme} color="inherit" size="small" aria-label="toggle theme">
                    {mode === "dark" ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                  </IconButton>
                </Tooltip>
              )}
              <SearchDialog />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <main>{children}</main>
      <Box component="footer" sx={{ mt: 8, borderTop: "1px solid", borderColor: "divider", bgcolor: mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.02)" }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "space-between" }}>
            {/* Brand */}
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 30%" }, minWidth: 240 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}>
                Nitrogen
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
                Exploring tech, code, and the future. In-depth articles on web development, AI, systems architecture, and emerging technologies.
              </Typography>
            </Box>

            {/* Navigation */}
            <Box sx={{ flex: { xs: "1 1 calc(50% - 12px)", md: "1 1 20%" }, minWidth: 160 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2, textTransform: "uppercase", letterSpacing: 1 }}>
                Navigate
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  { label: "Home", href: "/" },
                  { label: "Posts", href: "/posts" },
                  { label: "Tags", href: "/tags" },
                  { label: "About", href: "/about" },
                ].map((link) => (
                  <Typography
                    key={link.label}
                    component={Link}
                    href={link.href}
                    variant="body2"
                    sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { color: "primary.main" } }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Subscribe */}
            <Box sx={{ flex: { xs: "1 1 calc(50% - 12px)", md: "1 1 20%" }, minWidth: 160 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 2, textTransform: "uppercase", letterSpacing: 1 }}>
                Subscribe
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  component="a"
                  href="/rss.xml"
                  target="_blank"
                  variant="body2"
                  sx={{ color: "text.secondary", textDecoration: "none", display: "flex", alignItems: "center", gap: 0.5, "&:hover": { color: "#ee802f" } }}
                >
                  {"\u25C9"} RSS Feed
                </Typography>
                <Typography
                  component="a"
                  href="https://github.com/xfwfm4btvf-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  sx={{ color: "text.secondary", textDecoration: "none", display: "flex", alignItems: "center", gap: 0.5, "&:hover": { color: "primary.main" } }}
                >
                  {"\u25C9"} GitHub
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Bottom bar */}
          <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid", borderColor: "divider", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
            <Typography variant="caption" color="text.disabled">
              {"\u00A9"} 2026 Nitrogen Blog. All rights reserved.
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Built with Next.js &amp; Material UI
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
