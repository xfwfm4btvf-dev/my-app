#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://xfwfm4btvf-dev.github.io/my-app';

function fetchUrl(url) {
  return new Promise(function(resolve, reject) {
    https.get(url, { headers: { 'User-Agent': 'SEO-Audit/1.0' } }, function(res) {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      var data = '';
      res.on('data', function(c) { data += c; });
      res.on('end', function() { resolve({ status: res.statusCode, body: data }); });
    }).on('error', reject);
  });
}

function analyzeHtml(html, url) {
  var p = { url: url, errors: [], warnings: [], passed: [] };
  var titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) p.errors.push('Missing title');
  else {
    var tl = titleMatch[1].trim().length;
    if (tl < 10) p.warnings.push('Title too short: ' + tl);
    else if (tl > 60) p.warnings.push('Title too long: ' + tl);
    else p.passed.push('Title OK: ' + tl + ' chars');
  }
  var descMatch = html.match(/<meta[^>]*name=["']description["']/i);
  if (!descMatch) p.warnings.push('No meta description');
  else p.passed.push('Meta description present');
  var ogTitle = html.match(/<meta[^>]*property=["']og:title["']/i);
  var ogImage = html.match(/<meta[^>]*property=["']og:image["']/i);
  if (!ogTitle) p.warnings.push('Missing og:title');
  else p.passed.push('og:title present');
  if (!ogImage) p.warnings.push('Missing og:image');
  else p.passed.push('og:image present');
  var canonical = html.match(/<link[^>]*rel=["']canonical["']/i);
  if (!canonical) p.warnings.push('Missing canonical');
  else p.passed.push('Canonical present');
  var h1s = (html.match(/<h1[^>]*>/gi) || []).length;
  if (h1s === 0) p.errors.push('No h1');
  else if (h1s > 1) p.warnings.push('Multiple h1: ' + h1s);
  else p.passed.push('Single h1');
  var jsonLd = html.match(/<script[^>]*type=["']application\/ld\+json["']/gi);
  if (!jsonLd) p.warnings.push('No JSON-LD');
  else p.passed.push('JSON-LD present');
  return p;
}

async function run() {
  var pages = ['/', '/posts', '/about', '/tags'];
  try {
    var r = await fetchUrl(BASE_URL + '/posts');
    var re = /href=["'][^"']*\/posts\/([^"']+)["']/gi;
    var m, slugs = [];
    while ((m = re.exec(r.body)) !== null) {
      if (slugs.indexOf(m[1]) === -1) slugs.push(m[1]);
    }
    slugs.forEach(function(s) { pages.push('/posts/' + s); });
  } catch(e) {}
  
  var results = { pages: [], summary: { total: 0, errors: 0, warnings: 0, passed: 0 } };
  for (var i = 0; i < pages.length; i++) {
    try {
      var res = await fetchUrl(BASE_URL + pages[i]);
      var a = analyzeHtml(res.body, pages[i]);
      results.pages.push(a);
      results.summary.errors += a.errors.length;
      results.summary.warnings += a.warnings.length;
      results.summary.passed += a.passed.length;
      results.summary.total++;
    } catch(e) {
      results.summary.errors++;
    }
  }
  
  console.log('Pages: ' + results.summary.total);
  console.log('Passed: ' + results.summary.passed);
  console.log('Warnings: ' + results.summary.warnings);
  console.log('Errors: ' + results.summary.errors);
  var total = results.summary.passed + results.summary.errors + results.summary.warnings;
  var score = total > 0 ? Math.round((results.summary.passed / total) * 100) : 0;
  var grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';
  console.log('Score: ' + score + '% (Grade: ' + grade + ')');
  
  // Show issues
  results.pages.forEach(function(p) {
    if (p.errors.length > 0 || p.warnings.length > 0) {
      console.log('\n[' + p.url + ']');
      p.errors.forEach(function(e) { console.log('  ERROR: ' + e); });
      p.warnings.forEach(function(w) { console.log('  WARN: ' + w); });
    }
  });
}
run();
