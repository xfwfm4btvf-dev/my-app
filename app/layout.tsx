import type { Metadata } from "next";
import "./globals.css";
import { SearchDialog } from "@/components/SearchDialog";
import { BackToTop } from "@/components/BackToTop";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nitrogen Blog - Tech, Code and Future",
  description: "Exploring tech, code, and the future. In-depth articles on web development, DevOps, architecture, and emerging technologies.",
  keywords: ["web development", "TypeScript", "Next.js", "Rust", "DevOps", "architecture", "programming"],
  authors: [{ name: "Nitrogen" }],
  openGraph: {
    title: "Nitrogen Blog - Tech, Code and Future",
    description: "In-depth articles on web development, DevOps, architecture, and emerging technologies.",
    url: "https://xfwfm4btvf-dev.github.io/my-app/",
    siteName: "Nitrogen Blog",
    locale: "en_US",
    type: "website",
    images: [{ url: "/my-app/og-image.svg", width: 1200, height: 630, alt: "Nitrogen Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitrogen Blog - Tech, Code and Future",
    description: "In-depth articles on web development, DevOps, architecture, and emerging technologies.",
    images: ["/my-app/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://xfwfm4btvf-dev.github.io/"),
  alternates: {
    canonical: "/my-app/",
    types: {
      "application/rss+xml": [
        { url: "/my-app/rss.xml", title: "Nitrogen Blog RSS Feed" },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nitrogen Blog",
    url: "https://xfwfm4btvf-dev.github.io/my-app/",
    description: "In-depth articles on web development, DevOps, architecture, and emerging technologies.",
    author: { "@type": "Person", name: "Henry Nitrogen" },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://xfwfm4btvf-dev.github.io/my-app/posts?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Nitrogen Blog RSS Feed"
          href="/my-app/rss.xml"
        />
        <link rel="sitemap" type="application/xml" href="/my-app/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-black text-white min-h-screen flex flex-col">
        <ReadingProgress />
        <nav className="border-b border-white/10 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/my-app" className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Nitrogen
            </a>
            <div className="flex items-center gap-4">
              <a href="/my-app" className="text-gray-300 hover:text-white transition-colors hidden sm:block">Home</a>
              <a href="/my-app/posts" className="text-gray-300 hover:text-white transition-colors hidden sm:block">Posts</a>
              <a href="/my-app/tags" className="text-gray-300 hover:text-white transition-colors hidden sm:block">Tags</a>
              <a href="/my-app/about" className="text-gray-300 hover:text-white transition-colors hidden sm:block">About</a>
              <a
                href="/my-app/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors"
                title="RSS Feed"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
                </svg>
              </a>
              <SearchDialog />
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
