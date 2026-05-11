#!/usr/bin/env node
/**
 * Sitemap Generator for Nitrogen Blog
 * Generates sitemap.xml from the posts defined in lib/posts.ts
 */

const fs = require('fs');
const path = require('path');

const postsFilePath = path.join(__dirname, '..', 'lib', 'posts.ts');
const outputFilePath = path.join(__dirname, '..', 'sitemap.xml');

const BASE_URL = 'https://xfwfm4btvf-dev.github.io/my-app';

function parsePosts() {
  const content = fs.readFileSync(postsFilePath, 'utf8');
  const posts = [];

  const postRegex = /\{\s*slug:\s*'([^']+)'[^}]*?date:\s*'([^']+)'/gs;

  let match;
  while ((match = postRegex.exec(content)) !== null) {
    const [, slug, date] = match;
    posts.push({ slug, date });
  }

  return posts;
}

function generateSitemap(posts) {
  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/posts', priority: '0.9', changefreq: 'daily' },
    { loc: '/tags', priority: '0.7', changefreq: 'weekly' },
    { loc: '/about', priority: '0.6', changefreq: 'monthly' },
  ];

  const today = new Date().toISOString().split('T')[0];

  const staticUrls = staticPages.map(page => `  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  const postUrls = posts.map(post => `  <url>
    <loc>${BASE_URL}/posts/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${postUrls}
</urlset>`;
}

const posts = parsePosts();
const sitemap = generateSitemap(posts);
fs.writeFileSync(outputFilePath, sitemap, 'utf8');

console.log(`Generated sitemap.xml with ${posts.length} posts + 4 static pages (${posts.length + 4} total URLs)`);
console.log(`Output: ${outputFilePath}`);
