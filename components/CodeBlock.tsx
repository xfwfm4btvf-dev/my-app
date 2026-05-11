"use client";

import React, { useState } from "react";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  codeContent?: string;
}

export function CodeBlock({ children, className, codeContent }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = codeContent || "";
    if (textToCopy) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const language = (className || "").replace("language-", "") || "code";

  return (
    <div className="relative group not-prose rounded-lg border border-white/10 bg-white/5 overflow-hidden my-6">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white-3">
        <span className="text-xs text-gray-500 uppercase tracking-wider font-mono font-medium">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10 active:scale-95"
          title="Copy code"
        >
          {copied ? (
            <span className="text-green-400 text-xs">Copied!</span>
          ) : (
            <span className="text-xs">Copy</span>
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className="!rounded-none !border-0 !bg-transparent !my-0 p-4">
          {children}
        </pre>
      </div>
    </div>
  );
}
