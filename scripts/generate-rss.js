#!/usr/bin/env node
/**
 * RSS Feed Generator for Nitrogen Blog
 * Generates rss.xml from the posts defined in lib/posts.ts
 */

const fs = require('fs');
const path = require('path');

const postsFilePath = path.join(__dirname, '..', 'lib', 'posts.ts');
const outputFilePath = path.join(__dirname, '..', 'public', 'rss.xml');

const BASE_URL = 'https://xfwfm4btvf-dev.github.io/my-app';

function parsePosts() {
  const content = fs.readFileSync(postsFilePath, 'utf8');
  const posts = [];
  
  const postRegex = /{\s*slug:\s*'([^']+)'.*?title:\s*'([^']+)'.*?excerpt:\s*'([^']+)'.*?date:\s*'([^']+)'.*?tags:\s*\[(.*?)\]/gs;
  
  let match;
  while ((match = postRegex.exec(content)) !== null) {
    const [, slug, title, excerpt, date, tagsStr] = match;
    const tags = tagsStr.split(',').map(t => t.trim().replace(/'/g, ''));
    posts.push({ slug, title, excerpt, date, tags });
  }
  
  return posts;
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRss(posts) {
  const now = new Date().toUTCString();
  
  const items = posts.map(post => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/posts/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/posts/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nitrogen Blog - Tech, Code and Future</title>
    <link>${BASE_URL}</link>
    <description>Exploring tech, code, and the future. In-depth articles on web development, DevOps, architecture, and emerging technologies.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const posts = parsePosts();
const rss = generateRss(posts);
fs.writeFileSync(outputFilePath, rss, 'utf8');

console.log(`Generated RSS feed with ${posts.length} posts`);
console.log(`Output: ${outputFilePath}`);
