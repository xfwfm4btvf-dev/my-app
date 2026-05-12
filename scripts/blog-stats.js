#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'posts');
const WORDS_PER_MINUTE = 200;

function analyzePost(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(String.fromCharCode(10));
  let title = '', date = '', tags = [], excerpt = '';
  let inFrontmatter = false, bodyLines = [];
  for (const line of lines) {
    if (line.trim() === '---') { inFrontmatter = !inFrontmatter; continue; }
    if (inFrontmatter) {
      const titleMatch = line.match(/^title:\s*(.+)/);
      if (titleMatch) title = titleMatch[1].replace(/^["']|["']$/g, '');
      const dateMatch = line.match(/^date:\s*(.+)/);
      if (dateMatch) date = dateMatch[1].trim();
      const tagsMatch = line.match(/^tags:\s*\[(.*)\]/);
      if (tagsMatch) tags = tagsMatch[1].split(',').map(t => t.trim());
      const excerptMatch = line.match(/^excerpt:\s*(.+)/);
      if (excerptMatch) excerpt = excerptMatch[1].trim();
    } else {
      bodyLines.push(line);
    }
  }
  const body = bodyLines.join(" ");
  const words = body.split(/\s+/).filter(w => w.length > 0).length;
  const readingTime = Math.ceil(words / WORDS_PER_MINUTE);
  const headings = bodyLines.filter(l => l.startsWith("#")).length;
  const codeBlocks = (body.match(/```/g) || []).length / 2;
  return { title, date, tags, excerpt, words, readingTime, headings, codeBlocks: Math.floor(codeBlocks), file: path.basename(filePath) };
}

function main() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  const posts = files.map(f => analyzePost(path.join(CONTENT_DIR, f)));
  const totalWords = posts.reduce((s, p) => s + p.words, 0);
  const totalReading = posts.reduce((s, p) => s + p.readingTime, 0);
  const tagCount = {};
  posts.forEach(p => p.tags.forEach(t => { tagCount[t] = (tagCount[t] || 0) + 1; }));
  const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);
  console.log('Blog Content Statistics');
  console.log('========================================');
  console.log('Total Posts: ' + posts.length);
  console.log('Total Words: ' + totalWords.toLocaleString());
  console.log('Avg Words/Post: ' + Math.round(totalWords / posts.length));
  console.log('Total Reading Time: ' + totalReading + ' min');
  console.log('Avg Reading Time: ' + Math.round(totalReading / posts.length) + ' min');
  console.log('');
  console.log('Top Tags:');
  sortedTags.slice(0, 15).forEach(([tag, count]) => {
    const bar = '#'.repeat(count);
    console.log('  ' + tag.padEnd(20) + bar + ' (' + count + ')');
  });
  console.log('');
  console.log('Posts by Length (words):');
  const byLength = [...posts].sort((a, b) => b.words - a.words);
  byLength.slice(0, 5).forEach(p => {
    console.log('  ' + p.words.toString().padStart(6) + ' - ' + p.title.substring(0, 50));
  });
  console.log('');
  console.log('Recent Posts:');
  const byDate = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  byDate.slice(0, 5).forEach(p => {
    console.log('  ' + p.date + ' | ' + p.readingTime + 'min | ' + p.title.substring(0, 45));
  });
  console.log('');
  console.log('========================================');
}

main();
