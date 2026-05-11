import type { Metadata } from "next";
import "./globals.css";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitrogen Blog - Tech, Code and Future",
    description: "In-depth articles on web development, DevOps, architecture, and emerging technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://xfwfm4btvf-dev.github.io/my-app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white min-h-screen">
        <nav className="border-b border-white/10 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Nitrogen
            </a>
            <div className="flex gap-6">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="/posts" className="text-gray-300 hover:text-white transition-colors">Posts</a>
              <a href="/tags" className="text-gray-300 hover:text-white transition-colors">Tags</a>
              <a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}