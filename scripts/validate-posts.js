#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

let posts = [];
try {
  const src = fs.readFileSync(path.join(__dirname, '..', 'lib', 'posts.ts'), 'utf8');
  const blocks = src.split(/\{\s*slug:/);
  blocks.shift();
  for (const block of blocks) {
    const fb = '{ slug:' + block;
    const slugM = fb.match(/slug:\s*'([^']+)'/);
    const titleM = fb.match(/title:\s*'([^']+)'/);
    const excerptM = fb.match(/excerpt:\s*'([^']+)'/);
    const dateM = fb.match(/date:\s*'([^']+)'/);
    const tagsM = fb.match(/tags:\s*\[([^\]]+)\]/);
    const contentM = fb.match(/content:\s*`([^`]*)`/s);
    if (slugM) {
      posts.push({
        slug: slugM[1],
        title: titleM ? titleM[1] : null,
        excerpt: excerptM ? excerptM[1] : null,
        date: dateM ? dateM[1] : null,
        tags: tagsM ? tagsM[1].split(',').map(t => t.trim().replace(/['"']/g, '')) : [],
        content: contentM ? contentM[1] : '',
      });
    }
  }
} catch (e) { console.error('Failed:', e.message); process.exit(1); }

const r = { p: 0, w: 0, e: 0, issues: [] };
function check(c, s, m, sev='error') {
  if (!c) { r[sev==='error'?'e':'w']++; r.issues.push({s,m,sev}); } else { r.p++; }
}

console.log('Validating ' + posts.length + ' blog posts...');
for (const p of posts) {
  check(!!p.title, p.slug, 'Missing title');
  check(!!p.excerpt, p.slug, 'Missing excerpt');
  check(!!p.date, p.slug, 'Missing date');
  check(p.content.length > 50, p.slug, 'Content too short (' + p.content.length + ' chars)');
  if (p.title) {
    check(p.title.length >= 10, p.slug, 'Title too short (' + p.title.length + ' chars)', 'warning');
    check(p.title.length <= 70, p.slug, 'Title too long (' + p.title.length + ' chars)', 'warning');
  }
  if (p.excerpt) {
    check(p.excerpt.length >= 30, p.slug, 'Excerpt too short (' + p.excerpt.length + ' chars)', 'warning');
    check(p.excerpt.length <= 200, p.slug, 'Excerpt too long (' + p.excerpt.length + ' chars)', 'warning');
  }
  check(p.tags.length >= 1, p.slug, 'No tags', 'warning');
  check(p.tags.length <= 6, p.slug, 'Too many tags (' + p.tags.length + ')', 'warning');
}

console.log('---');
console.log('Passed: ' + r.p + ' | Warnings: ' + r.w + ' | Errors: ' + r.e);
console.log('Posts: ' + posts.length);
if (r.issues.length > 0) {
  console.log('Issues:');
  for (const i of r.issues) {
    console.log('  [' + i.s + '] ' + i.m);
  }
} else {
  console.log('All passed!');
}
