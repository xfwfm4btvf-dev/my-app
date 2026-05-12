"use client";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Box,
  Button,
} from "@mui/material";
import Link from "next/link";

const posts = [
  {
    slug: "edge-computing-webassembly",
    title: "Edge Computing Meets WebAssembly",
    excerpt: "How WebAssembly is unlocking new possibilities for edge computing and server-side applications.",
    tags: ["WebAssembly", "Edge Computing"],
    date: "2026-05-11",
  },
  {
    slug: "circuit-breaker-pattern-apis",
    title: "Building Resilient APIs with the Circuit Breaker Pattern",
    excerpt: "Prevent cascading failures in distributed systems with the circuit breaker design pattern.",
    tags: ["Architecture", "APIs"],
    date: "2026-05-11",
  },
  {
    slug: "rust-for-web-developers",
    title: "Why Web Developers Should Learn Rust in 2026",
    excerpt: "Rust is no longer just for systems programmers — it is becoming essential for modern web development.",
    tags: ["Rust", "Web Development"],
    date: "2026-05-11",
  },
];

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold" }} gutterBottom>
          Nitrogen
        </Typography>
        <Typography variant="h5" sx={{ color: "text.secondary" }} gutterBottom>
          Exploring tech, code, and the future
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/posts"
          sx={{ mt: 3 }}
        >
          Browse Posts
        </Button>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
        Latest Posts
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 4 }}>
        Thoughts on technology and development
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {posts.map((post) => (
          <Box key={post.slug} sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" }, minWidth: 280 }}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardActionArea
                component={Link}
                href={`/posts/${post.slug}`}
                sx={{ height: "100%" }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    {post.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {post.excerpt}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ mt: 2, display: "block", color: "primary.main" }}
                  >
                    Read more →
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>

      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button component={Link} href="/posts" variant="outlined">
          View All Posts
        </Button>
      </Box>
    </Container>
  );
}
