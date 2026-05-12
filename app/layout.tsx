import type { Metadata } from "next";
import MUIProvider from "../components/MUIProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://xfwfm4btvf-dev.github.io/my-app/"),
  title: {
    default: "Nitrogen Blog — Tech, Code, and the Future",
    template: "%s | Nitrogen Blog",
  },
  description:
    "Exploring cutting-edge technology: WebAssembly, Rust, AI, distributed systems, and modern web development. Deep dives into engineering patterns and emerging tech.",
  keywords: [
    "technology blog",
    "web development",
    "WebAssembly",
    "Rust",
    "AI",
    "distributed systems",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nitrogen Blog",
    title: "Nitrogen Blog — Tech, Code, and the Future",
    description:
      "Exploring cutting-edge technology: WebAssembly, Rust, AI, distributed systems, and modern web development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitrogen Blog",
    description:
      "Exploring cutting-edge technology: WebAssembly, Rust, AI, and modern web development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#121212" />
        <link rel="icon" href="/my-app/favicon.ico" />
      </head>
      <body>
        <MUIProvider>{children}</MUIProvider>
      </body>
    </html>
  );
}
