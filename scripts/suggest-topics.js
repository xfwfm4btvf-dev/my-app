#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const POSTS_FILE = path.join(__dirname, '..', 'lib', 'posts.ts');
const OUTPUT_FILE = path.join(__dirname, '..', 'content', 'suggested-topics.json');

function getExisting() {
  const c = fs.readFileSync(POSTS_FILE, 'utf-8');
  return {
    slugs: [...c.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]),
    titles: [...c.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1].toLowerCase()),
  };
}

async function fetchHN() {
  const ids = await (await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')).json();
  const stories = await Promise.all(ids.slice(0, 30).map(id =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json()).catch(() => null)
  ));
  return stories.filter(s => s?.title && s.score > 50).map(s => ({
    title: s.title, url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
    score: s.score, source: 'hackernews'
  }));
}

async function fetchGH() {
  const since = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
  const data = await (await fetch(
    `https://api.github.com/search/repositories?q=created:>${since}&sort=stars&order=desc&per_page=15`,
    { headers: { 'Accept': 'application/vnd.github.v3+json' } }
  )).json();
  return (data.items || []).map(r => ({
    title: `${r.name}: ${r.description || ''}`, url: r.html_url,
    score: r.stargazers_count, source: 'github', language: r.language
  }));
}

const TECH_KW = ['ai','llm','rust','typescript','wasm','webassembly','kubernetes','docker','react','nextjs',
  'blockchain','security','database','edge','api','serverless','agents','mcp','performance','zig','quantum'];

function extractTopics(text) { return TECH_KW.filter(k => text.toLowerCase().includes(k)); }

async function main() {
  const existing = getExisting();
  console.log(`Posts: ${existing.slugs.length}`);
  const [hn, gh] = await Promise.all([fetchHN(), fetchGH()]);
  console.log(`HN: ${hn.length}, GH: ${gh.length}`);
  const all = [...hn, ...gh];
  const suggestions = all.map(item => {
    const topics = extractTopics(item.title);
    if (topics.length === 0 && item.source === 'hackernews' && item.score < 100) return null;
    return { title: item.title, source: item.source, url: item.url, score: item.score, topics,
      relevance: topics.length * 10 + Math.log10(item.score + 1) * 5 };
  }).filter(Boolean).sort((a, b) => b.relevance - a.relevance).slice(0, 10);
  
  suggestions.forEach((s, i) => console.log(`${i+1}. [${s.source}] ${s.title} (${s.relevance.toFixed(1)})`));
  
  const dir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), suggestions }, null, 2));
  console.log(`Saved to ${OUTPUT_FILE}`);
}
main().catch(e => { console.error(e); process.exit(1); });
