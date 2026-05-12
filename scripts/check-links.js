#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'posts');
const BASE_URL = 'https://xfwfm4btvf-dev.github.io/my-app';

function getValidSlugs() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  const slugs = new Set();
  slugs.add('/');
  slugs.add('/posts');
  slugs.add('/tags');
  slugs.add('/about');
  files.forEach(file => {
    const slug = file.replace('.md', '');
    slugs.add('/posts/' + slug);
    slugs.add('/my-app/posts/' + slug);
  });
  return slugs;
}

function extractLinks(content, filePath) {
  const links = [];
  const lines_arr = content.split(String.fromCharCode(10));
  lines_arr.forEach((line, i) => {
    const mdLinks = line.matchAll(/\[([^\]]*)\]\(([^)]+)\)/g);
    for (const match of mdLinks) {
      links.push({ text: match[1], url: match[2], line: i + 1, file: path.basename(filePath) });
    }
  });
  return links;
}

function isInternal(url) {
  return url.startsWith('/') || url.startsWith(BASE_URL);
}

function checkInternal(url, validSlugs) {
  let normalized = url.replace(BASE_URL, '');
  normalized = normalized.split('#')[0].split('?')[0];
  if (normalized === '' || normalized === '/') return { ok: true };
  if (validSlugs.has(normalized)) return { ok: true };
  if (validSlugs.has('/' + normalized.replace(/^\//, ''))) return { ok: true };
  return { ok: false, reason: 'Not found: ' + normalized };
}

function fetchUrl(url, maxRedirects) {
  maxRedirects = maxRedirects || 3;
  return new Promise((resolve) => {
    if (maxRedirects <= 0) return resolve({ status: 0, error: 'Too many redirects' });
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Nitrogen-LinkChecker/1.0' }, timeout: 10000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = new URL(res.headers.location, url).href;
        return fetchUrl(next, maxRedirects - 1).then(resolve);
      }
      resolve({ status: res.statusCode });
    });
    req.on('error', (err) => resolve({ status: 0, error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, error: 'Timeout' }); });
  });
}

async function main() {
  const checkExternal = process.argv.includes('--external');
  const showAll = process.argv.includes('--all');
  console.log('Link Checker - Nitrogen Blog');
  console.log('========================================');
  const validSlugs = getValidSlugs();
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  let totalLinks = 0;
  let brokenInternal = [];
  let externalLinks = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const links = extractLinks(content, file);
    totalLinks += links.length;
    for (const link of links) {
      if (isInternal(link.url)) {
        const result = checkInternal(link.url, validSlugs);
        if (!result.ok) brokenInternal.push({ ...link, error: result.reason });
      } else if (link.url.startsWith(http ? null : null)) { }
      else if (link.url.startsWith('http')) { externalLinks.push(link); }
    }
  }
  console.log('');
  console.log('Scan Results: ' + files.length + ' files, ' + totalLinks + ' links');
  console.log('');
  if (brokenInternal.length > 0) {
    console.log('BROKEN Internal Links (' + brokenInternal.length + '):');
    brokenInternal.forEach(b => {
      console.log('  ' + b.file + ':' + b.line + ' -- ' + b.url);
      console.log('    -> ' + b.error);
    });
  } else {
    console.log('OK - All internal links valid');
  }
  if (checkExternal && externalLinks.length > 0) {
    console.log('');
    console.log('Checking ' + externalLinks.length + ' external links...');
    const unique = [...new Set(externalLinks.map(l => l.url))];
    for (const url of unique.slice(0, 20)) {
      const result = await fetchUrl(url);
      const status = result.status || 'ERR';
      if (status !== 200 && status !== 301 && status !== 302) {
        console.log('  WARN ' + status + ' - ' + url.substring(0, 80));
        const usages = externalLinks.filter(l => l.url === url);
        usages.forEach(u => console.log('    Used in ' + u.file + ':' + u.line));
      } else if (showAll) {
        console.log('  OK ' + status + ' - ' + url.substring(0, 80));
      }
    }
  } else if (!checkExternal) {
    const uniqueExternal = new Set(externalLinks.map(l => l.url));
    console.log('');
    console.log('INFO: ' + uniqueExternal.size + ' external links found (use --external to check)');
  }
  console.log('');
  console.log('========================================');
  if (brokenInternal.length === 0) {
    console.log('Blog link health: GOOD');
  } else {
    console.log('Blog link health: ' + brokenInternal.length + ' issues found');
    process.exit(1);
  }
}

main().catch(err => { console.error('Fatal error:', err); process.exit(1); });
