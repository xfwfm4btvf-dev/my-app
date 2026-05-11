"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
        setResults([]);
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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-gray-400 text-sm"
        title="Search (Ctrl+K)"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-white/10 rounded border border-white/10">
          Ctrl+K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => {
          setIsOpen(false);
          setQuery("");
          setResults([]);
        }}
      />
      <div className="relative w-full max-w-xl mx-4 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search posts by title, tag, or keyword..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
          />
          <button
            onClick={() => {
              setIsOpen(false);
              setQuery("");
              setResults([]);
            }}
            className="px-2 py-1 text-xs text-gray-400 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
          >
            ESC
          </button>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <p className="text-sm">Type to search through {posts.length} articles</p>
              <p className="text-xs mt-1 text-gray-600">Search by title, tags, or content keywords</p>
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <p className="text-sm">No results found</p>
            </div>
          ) : (
            <div className="py-2">
              {results.map((result) => (
                <a
                  key={result.slug}
                  href={`/my-app/posts/${result.slug}`}
                  className="block px-4 py-3 hover:bg-white/5 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                    setResults([]);
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{result.title}</h4>
                      <p className="text-sm text-gray-400 mt-0.5 line-clamp-1">{result.excerpt}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-gray-500">{result.date}</span>
                        {result.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-gray-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-600">
          <span>{results.length > 0 ? `${results.length} results` : ""}</span>
          <span>Nitrogen Search</span>
        </div>
      </div>
    </div>
  );
}
