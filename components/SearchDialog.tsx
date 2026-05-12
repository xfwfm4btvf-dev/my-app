"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  TextField,
  Box,
  Typography,
  Chip,
  IconButton,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { posts } from "@/lib/posts";

interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  score: number;
}

function searchPosts(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results: SearchResult[] = [];

  for (const post of posts) {
    let score = 0;
    const titleLower = post.title.toLowerCase();
    const excerptLower = post.excerpt.toLowerCase();
    const contentLower = post.content.toLowerCase();
    const tagsLower = post.tags.map((t) => t.toLowerCase());

    for (const term of terms) {
      if (titleLower.includes(term)) score += 10;
      if (tagsLower.some((t) => t.includes(term))) score += 7;
      if (excerptLower.includes(term)) score += 4;
      if (contentLower.includes(term)) score += 1;
    }

    if (score > 0) {
      results.push({ ...post, score });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    setResults(searchPosts(q));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        size="small"
        sx={{
          color: "text.secondary",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
          fontSize: "0.8rem",
          gap: 0.5,
          "&:hover": { bgcolor: "action.hover" },
        }}
        title="Search (Ctrl+K)"
      >
        <SearchIcon sx={{ fontSize: 18 }} />
        <Typography variant="caption" sx={{ display: { xs: "none", sm: "inline" }, color: "text.secondary" }}>
          Search
        </Typography>
        <Chip
          label="⌘K"
          size="small"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            height: 18,
            fontSize: "0.65rem",
            bgcolor: "action.hover",
            color: "text.disabled",
          }}
        />
      </IconButton>

      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: "grey.900",
              borderRadius: 3,
              mt: "15vh",
              border: "1px solid",
              borderColor: "divider",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
          <SearchIcon sx={{ color: "text.secondary", mr: 1.5 }} />
          <TextField
            inputRef={inputRef}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search posts by title, tag, or keyword..."
            variant="standard"
            fullWidth
            slotProps={{
              input: {
                disableUnderline: true,
                style: { color: "white", fontSize: "1rem" },
              },
            }}
          />
          <IconButton onClick={handleClose} size="small" sx={{ ml: 1 }}>
            <CloseIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          </IconButton>
        </Box>

        <Box sx={{ maxHeight: 400, overflowY: "auto", py: 1 }}>
          {query.trim() === "" ? (
            <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
              <Typography variant="body2">Type to search through {posts.length} articles</Typography>
              <Typography variant="caption" sx={{ color: "text.disabled", mt: 0.5, display: "block" }}>
                Search by title, tags, or content keywords
              </Typography>
            </Box>
          ) : results.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
              <Typography variant="body2">No results found</Typography>
            </Box>
          ) : (
            results.map((result) => (
              <MuiLink
                key={result.slug}
                href={`/my-app/posts/${result.slug}`}
                underline="none"
                onClick={handleClose}
              >
                <Paper
                  elevation={0}
                  sx={{
                    px: 2,
                    py: 1.5,
                    mx: 1,
                    mb: 0.5,
                    bgcolor: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 1,
                    "&:hover": { bgcolor: "action.hover" },
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }} noWrap>
                      {result.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }} noWrap>
                      {result.excerpt}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                      <Typography variant="caption" sx={{ color: "text.disabled" }}>
                        {result.date}
                      </Typography>
                      {result.tags.slice(0, 3).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.7rem",
                            bgcolor: "primary.dark",
                            color: "primary.light",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <ArrowForwardIcon sx={{ fontSize: 16, color: "text.disabled", mt: 0.5, flexShrink: 0 }} />
                </Paper>
              </MuiLink>
            ))
          )}
        </Box>

        <Box
          sx={{
            px: 2,
            py: 1,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {results.length > 0 ? `${results.length} results` : ""}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            Nitrogen Search
          </Typography>
        </Box>
      </Dialog>
    </>
  );
}
