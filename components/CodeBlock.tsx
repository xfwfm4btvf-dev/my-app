"use client";

import React, { useState, useRef } from "react";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = async () => {
    const code = codeRef.current?.textContent;
    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const isCodeBlock = className?.includes("language-");

  if (!isCodeBlock) {
    return <code className={className}>{children}</code>;
  }

  const language = className?.replace("language-", "") || "code";

  return (
    <div className="relative group">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 rounded-t-lg">
        <span className="text-xs text-gray-500 uppercase tracking-wider font-mono">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
          title="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="!rounded-t-none !mt-0 overflow-x-auto">
        <code ref={codeRef} className={className}>
          {children}
        </code>
      </pre>
    </div>
  );
}

export function InlineCode({ children, className }: CodeBlockProps) {
  return <code className={className}>{children}</code>;
}
