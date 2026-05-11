(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,30179,e=>{"use strict";let t=[{slug:"edge-computing-webassembly",title:"Edge Computing Meets WebAssembly",excerpt:"How WebAssembly is unlocking new possibilities for edge computing and server-side applications.",date:"2026-05-11",tags:["WebAssembly","Edge Computing"],content:`# Edge Computing Meets WebAssembly

The convergence of WebAssembly (Wasm) and edge computing is reshaping how we think about application deployment. Originally designed for browsers, Wasm's sandboxed execution model makes it a natural fit for edge environments.

## Why WebAssembly at the Edge

Traditional serverless functions suffer from cold starts. Wasm modules, by contrast, can instantiate in microseconds. This makes them ideal for latency-sensitive edge workloads like real-time personalization, A/B testing, and authentication.

## The WASI Standard

The WebAssembly System Interface (WASI) provides a standardized way for Wasm modules to interact with the host OS. This means your Wasm code can run identically across Cloudflare Workers, Fastly Compute, and Fermyon's Spin — truly write once, run anywhere.

## Getting Started

\`\`\`rust
use spin_sdk::http::{Request, Response};

#[spin_sdk::http_component]
fn handle_request(req: Request) -> Response {
    Response::builder()
        .status(200)
        .body("Hello from the edge!")
        .build()
}
\`\`\`

## The Future

With the Component Model proposal, Wasm modules will be able to compose and interoperate across languages. Imagine importing a Rust crypto library directly into your JavaScript edge function — that future is closer than you think.`},{slug:"circuit-breaker-pattern-apis",title:"Building Resilient APIs with the Circuit Breaker Pattern",excerpt:"Prevent cascading failures in distributed systems with the circuit breaker design pattern.",date:"2026-05-11",tags:["Architecture","APIs"],content:`# Building Resilient APIs with the Circuit Breaker Pattern

In distributed systems, failures are inevitable. The circuit breaker pattern prevents a single failing service from cascading into a system-wide outage.

## How It Works

A circuit breaker monitors calls to external services and "trips" (opens) when failures exceed a threshold. It has three states:

- **Closed**: Requests flow normally. Failures are counted.
- **Open**: Requests are immediately rejected with a fallback response.
- **Half-Open**: After a timeout, a limited number of test requests are allowed through.

## Implementation

\`\`\`typescript
class CircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private threshold: number = 5,
    private timeout: number = 30000
  ) {}

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailure > this.timeout) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit is open');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = 'closed';
  }

  private onFailure() {
    this.failures++;
    this.lastFailure = Date.now();
    if (this.failures >= this.threshold) {
      this.state = 'open';
    }
  }
}
\`\`\`

## Best Practices

1. **Use with retry logic**: Combine with exponential backoff for transient failures.
2. **Monitor circuit states**: Expose metrics for alerting when circuits open.
3. **Provide meaningful fallbacks**: Return cached data or degraded functionality instead of errors.`},{slug:"rust-for-web-developers",title:"Why Web Developers Should Learn Rust in 2026",excerpt:"Rust is no longer just for systems programmers — it is becoming essential for modern web development.",date:"2026-05-10",tags:["Rust","Web Development"],content:`# Why Web Developers Should Learn Rust in 2026

Rust has been voted the most loved programming language for eight years running. But beyond the hype, Rust is making concrete inroads into web development tooling.

## Rust-Powered Web Tools

The most popular web tools are increasingly built with Rust:

- **SWC**: Powers Next.js compilation, replacing Babel
- **Turbopack**: Vercel's Rust-based bundler replacing Webpack
- **Biome**: Rust rewrite of ESLint + Prettier
- **oxc**: Fast JavaScript linter and parser

These tools deliver 10-100x speed improvements over their JavaScript predecessors.

## Beyond Tooling

Rust is also becoming viable for writing web applications directly:

- **Leptos**: A full-stack Rust framework with fine-grained reactivity
- **Actix Web**: Blazingly fast HTTP framework
- **Dioxus**: React-like component model in Rust

## Where to Start

If you are a web developer new to Rust, start with:

1. The Rust Book (free online)
2. Exercism's Rust track
3. Build a small CLI tool, then try a simple API with Actix

The learning curve is real, but the payoff in performance and reliability is immense.`},{slug:"database-indexing-strategies",title:"Database Indexing Strategies for High-Traffic Applications",excerpt:"Master the art of database indexing to keep your application fast as it scales.",date:"2026-05-09",tags:["Database","Performance"],content:`# Database Indexing Strategies for High-Traffic Applications

Poor indexing is the number one cause of slow database queries. Here is how to get it right.

## Understanding Index Types

### B-Tree Indexes
The default index type in most databases. Excellent for equality and range queries, ORDER BY, and JOIN operations.

### Hash Indexes
Faster for exact equality lookups but cannot handle range queries. Use sparingly.

### GIN / GiST Indexes
Specialized for full-text search, JSON queries, and geometric data in PostgreSQL.

## Composite Indexes

The order of columns matters. An index on (user_id, created_at) supports:
- Queries filtering by user_id alone
- Queries filtering by user_id AND created_at
- Queries filtering by user_id with ORDER BY created_at

It does NOT support queries filtering only by created_at.

## The EXPLAIN Command

Always validate your indexes:

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 123
ORDER BY created_at DESC
LIMIT 10;
\`\`\`

Look for "Seq Scan" (sequential scan) on large tables — that is a sign you need an index.

## Common Mistakes

1. **Over-indexing**: Each index adds write overhead. Only index columns used in WHERE, JOIN, and ORDER BY.
2. **Ignoring covering indexes**: Include all selected columns to avoid table lookups.
3. **Not monitoring unused indexes**: Remove indexes that are never read.`},{slug:"css-container-queries",title:"Container Queries: The End of Media Query Hacks",excerpt:"CSS container queries let components respond to their own size, not just the viewport.",date:"2026-05-08",tags:["CSS","Frontend"],content:`# Container Queries: The End of Media Query Hacks

For years, responsive design meant media queries tied to viewport width. Container queries change everything by letting components respond to their own container's size.

## The Problem

A card component might appear in a 300px sidebar or a 900px main area. With media queries, you cannot differentiate — the viewport is the same in both cases.

## The Solution

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
\`\`\`

## Container Query Units

New CSS units like \`cqw\` (container query width) let you size elements relative to their container:

\`\`\`css
.card-title {
  font-size: clamp(1rem, 3cqw, 1.5rem);
}
\`\`\`

## Browser Support

Container queries have full support in all modern browsers as of 2025. You can safely use them in production without fallbacks.

## Best Practices

1. Use container queries for reusable components
2. Keep media queries for page-level layout
3. Name your containers for clarity in complex layouts`},{slug:"mastering-typescript",title:"Mastering TypeScript: A Guide to Better JavaScript",excerpt:"TypeScript has become the gold standard for building robust web applications.",date:"2026-05-10",tags:["TypeScript","JavaScript"],content:`# Mastering TypeScript: A Guide to Better JavaScript

TypeScript has become the gold standard for building robust web applications. But many developers only scratch the surface.

## Why TypeScript Matters

JavaScript is dynamic. TypeScript adds static typing, catching bugs before production. Teams report 15-20% fewer bugs.

## Advanced Patterns

### Utility Types

    interface User { id: number; name: string; }
    type UpdateUser = Partial<User>;
    type UserCredentials = Pick<User, 'email' | 'role'>;

### Discriminated Unions

    type ApiResponse<T> =
      | { status: 'loading' }
      | { status: 'success'; data: T }
      | { status: 'error'; message: string };

## Best Practices

1. Avoid any - Use unknown instead
2. Enable strict mode in tsconfig.json
3. Use branded types for IDs
4. Type your environment variables`},{slug:"getting-started-with-nextjs",title:"Getting Started with Next.js 16",excerpt:"Next.js 16 brings exciting new features.",date:"2026-05-08",tags:["Next.js","React"],content:`# Getting Started with Next.js 16

Next.js 16 continues to evolve with powerful new features.

## What is New

- Turbopack is now the default bundler
- Partial Prerendering combines static and dynamic content
- React 19 integration with Server Components
- Improved caching with a simpler model

## Project Setup

    npx create-next-app@latest my-app

## Server Components by Default

Components run on the server, reducing client JS. Add 'use client' only for interactivity.

## Tips for Production

1. Use generateStaticParams for static generation
2. Set output: export for fully static sites
3. Use loading.tsx for loading states
4. Add error.tsx for graceful error boundaries`},{slug:"ai-powered-development",title:"AI-Powered Development Tools",excerpt:"How AI assistants are transforming the way we write code.",date:"2026-05-05",tags:["AI","Productivity"],content:`# AI-Powered Development Tools

Artificial intelligence is revolutionizing how we write, review, and ship code.

## The AI Coding Landscape

1. Code completion: Inline suggestions (Copilot, Codeium)
2. Conversational agents: Chat-based assistants (Claude, ChatGPT)
3. Autonomous agents: Full-task execution (Codex, Claude Code)

## Code Completion Tools

- GitHub Copilot: VS Code integration, $10/mo
- Codeium: Free tier, multi-IDE
- Cursor: Agent mode, $20/mo
- Supermaven: Fastest completions

## Impact on Productivity

- 30-55% faster code writing
- 25% faster code review
- 10-15% fewer bugs with test generation

## Best Practices

1. Review everything - AI code may have subtle bugs
2. Use for boilerplate - Focus on architecture
3. Pair with tests - Always test AI-generated code
4. Stay in control - Use AI as a tool, not replacement`},{slug:"web-security-essentials",title:"Web Security Essentials for Modern Apps",excerpt:"Security is not optional. Learn the essential practices.",date:"2026-05-01",tags:["Security","Web"],content:`# Web Security Essentials for Modern Apps

Security must be a priority from day one.

## OWASP Top 10

1. Broken Access Control
2. Cryptographic Failures
3. Injection attacks
4. Insecure Design
5. Security Misconfiguration

## Authentication Best Practices

### Password Storage

    import bcrypt from 'bcrypt';
    const SALT_ROUNDS = 12;
    async function hashPassword(password) {
      return bcrypt.hash(password, SALT_ROUNDS);
    }

### JWT Security

- Use short-lived tokens (15 minutes)
- Implement refresh token rotation
- Store in httpOnly cookies, not localStorage
- Always validate iss and aud claims

## Quick Wins

1. Enable HTTPS everywhere
2. Sanitize user input
3. Keep dependencies updated
4. Implement rate limiting
5. Log security events`},{slug:"opentelemetry-observability-microservices",title:"OpenTelemetry: Unified Observability for Microservices",excerpt:"How OpenTelemetry is becoming the universal standard for traces, metrics, and logs in distributed systems.",date:"2026-05-11",tags:["Observability","DevOps"],content:`# OpenTelemetry: Unified Observability for Microservices

As microservices architectures grow more complex, understanding system behavior becomes critical. OpenTelemetry (OTel) has emerged as the unified standard for collecting traces, metrics, and logs.

## The Three Pillars

Observability rests on three data types:

- **Traces**: Track a request as it flows through multiple services
- **Metrics**: Quantitative measurements like latency percentiles and error rates
- **Logs**: Structured event records with contextual metadata

OTel provides a single SDK and API for all three, eliminating vendor lock-in.

## Getting Started with Traces

\`\`\`typescript
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('my-service');

async function handleRequest(req: Request) {
  return tracer.startActiveSpan('handle-request', async (span) => {
    span.setAttribute('http.method', req.method);
    span.setAttribute('http.url', req.url);

    try {
      const result = await processRequest(req);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
      span.recordException(error);
      throw error;
    } finally {
      span.end();
    }
  });
}
\`\`\`

## Context Propagation

The magic of distributed tracing is context propagation. OTel automatically passes trace context between services via HTTP headers (W3C Trace Context standard), linking spans across service boundaries into a complete trace.

## Collector Architecture

The OTel Collector is a vendor-agnostic proxy that receives, processes, and exports telemetry data. Deploy it as a sidecar or daemonset:

\`\`\`yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:

processors:
  batch:
    timeout: 5s
    send_batch_size: 1024

exporters:
  prometheus:
    endpoint: "0.0.0.0:8889"
  jaeger:
    endpoint: "jaeger:14250"
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [jaeger]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [prometheus]
\`\`\`

## Best Practices

1. **Use semantic conventions**: Follow OTel semantic conventions for consistent attribute naming
2. **Sample wisely**: Use head-based sampling for high-volume services, tail-based for error investigation
3. **Correlate signals**: Link traces to logs with trace IDs for seamless debugging
4. **Start small**: Begin with auto-instrumentation, then add custom spans for business logic`}];e.s(["getAllTags",0,function(){let e=new Set;return t.forEach(t=>t.tags.forEach(t=>e.add(t))),Array.from(e)},"getPostsByTag",0,function(e){return t.filter(t=>t.tags.includes(e))},"posts",0,t])},6528,e=>{"use strict";var t=e.i(18050),s=e.i(71645),r=e.i(46932);e.i(47167);var i=e.i(31178),a=e.i(47414),n=e.i(74008),o=e.i(21476),l=e.i(72846),c=s,u=e.i(37806);function d(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}class p extends c.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if((0,l.isHTMLElement)(t)&&e.isPresent&&!this.props.isPresent&&!1!==this.props.pop){let e=t.offsetParent,s=(0,l.isHTMLElement)(e)&&e.offsetWidth||0,r=(0,l.isHTMLElement)(e)&&e.offsetHeight||0,i=getComputedStyle(t),a=this.props.sizeRef.current;a.height=parseFloat(i.height),a.width=parseFloat(i.width),a.top=t.offsetTop,a.left=t.offsetLeft,a.right=s-a.width-a.left,a.bottom=r-a.height-a.top}return null}componentDidUpdate(){}render(){return this.props.children}}function m({children:e,isPresent:r,anchorX:i,anchorY:a,root:n,pop:o}){let l=(0,c.useId)(),h=(0,c.useRef)(null),g=(0,c.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:f}=(0,c.useContext)(u.MotionConfigContext),y=function(...e){return s.useCallback(function(...e){return t=>{let s=!1,r=e.map(e=>{let r=d(e,t);return s||"function"!=typeof r||(s=!0),r});if(s)return()=>{for(let t=0;t<r.length;t++){let s=r[t];"function"==typeof s?s():d(e[t],null)}}}}(...e),e)}(h,e.props?.ref??e?.ref);return(0,c.useInsertionEffect)(()=>{let{width:e,height:t,top:s,left:c,right:u,bottom:d}=g.current;if(r||!1===o||!h.current||!e||!t)return;let p="left"===i?`left: ${c}`:`right: ${u}`,m="bottom"===a?`bottom: ${d}`:`top: ${s}`;h.current.dataset.motionPopId=l;let y=document.createElement("style");f&&(y.nonce=f);let b=n??document.head;return b.appendChild(y),y.sheet&&y.sheet.insertRule(`
          [data-motion-pop-id="${l}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            ${p}px !important;
            ${m}px !important;
          }
        `),()=>{h.current?.removeAttribute("data-motion-pop-id"),b.contains(y)&&b.removeChild(y)}},[r]),(0,t.jsx)(p,{isPresent:r,childRef:h,sizeRef:g,pop:o,children:!1===o?e:c.cloneElement(e,{ref:y})})}let h=({children:e,initial:r,isPresent:i,onExitComplete:n,custom:l,presenceAffectsLayout:c,mode:u,anchorX:d,anchorY:p,root:h})=>{let f=(0,a.useConstant)(g),y=(0,s.useId)(),b=!0,x=(0,s.useMemo)(()=>(b=!1,{id:y,initial:r,isPresent:i,custom:l,onExitComplete:e=>{for(let t of(f.set(e,!0),f.values()))if(!t)return;n&&n()},register:e=>(f.set(e,!1),()=>f.delete(e))}),[i,f,n]);return c&&b&&(x={...x}),(0,s.useMemo)(()=>{f.forEach((e,t)=>f.set(t,!1))},[i]),s.useEffect(()=>{i||f.size||!n||n()},[i]),e=(0,t.jsx)(m,{pop:"popLayout"===u,isPresent:i,anchorX:d,anchorY:p,root:h,children:e}),(0,t.jsx)(o.PresenceContext.Provider,{value:x,children:e})};function g(){return new Map}var f=e.i(64978);let y=e=>e.key||"";function b(e){let t=[];return s.Children.forEach(e,e=>{(0,s.isValidElement)(e)&&t.push(e)}),t}let x=({children:e,custom:r,initial:o=!0,onExitComplete:l,presenceAffectsLayout:c=!0,mode:u="sync",propagate:d=!1,anchorX:p="left",anchorY:m="top",root:g})=>{let[x,w]=(0,f.usePresence)(d),v=(0,s.useMemo)(()=>b(e),[e]),S=d&&!x?[]:v.map(y),T=(0,s.useRef)(!0),C=(0,s.useRef)(v),A=(0,a.useConstant)(()=>new Map),k=(0,s.useRef)(new Set),[R,P]=(0,s.useState)(v),[I,j]=(0,s.useState)(v);(0,n.useIsomorphicLayoutEffect)(()=>{T.current=!1,C.current=v;for(let e=0;e<I.length;e++){let t=y(I[e]);S.includes(t)?(A.delete(t),k.current.delete(t)):!0!==A.get(t)&&A.set(t,!1)}},[I,S.length,S.join("-")]);let E=[];if(v!==R){let e=[...v];for(let t=0;t<I.length;t++){let s=I[t],r=y(s);S.includes(r)||(e.splice(t,0,s),E.push(s))}return"wait"===u&&E.length&&(e=E),j(b(e)),P(v),null}let{forceRender:N}=(0,s.useContext)(i.LayoutGroupContext);return(0,t.jsx)(t.Fragment,{children:I.map(e=>{let s=y(e),i=(!d||!!x)&&(v===I||S.includes(s));return(0,t.jsx)(h,{isPresent:i,initial:(!T.current||!!o)&&void 0,custom:r,presenceAffectsLayout:c,mode:u,root:g,onExitComplete:i?void 0:()=>{if(k.current.has(s)||!A.has(s))return;k.current.add(s),A.set(s,!0);let e=!0;A.forEach(t=>{t||(e=!1)}),e&&(N?.(),j(C.current),d&&w?.(),l&&l())},anchorX:p,anchorY:m,children:e},s)})})};var w=e.i(30179);e.s(["default",0,function(){let[e,i]=(0,s.useState)(""),[a,n]=(0,s.useState)(null),o=(0,s.useMemo)(()=>(0,w.getAllTags)(),[]),l=(0,s.useMemo)(()=>w.posts.filter(t=>{let s=""===e||t.title.toLowerCase().includes(e.toLowerCase())||t.excerpt.toLowerCase().includes(e.toLowerCase())||t.content.toLowerCase().includes(e.toLowerCase()),r=!a||t.tags.includes(a);return s&&r}),[e,a]);return(0,t.jsx)("div",{className:"min-h-screen py-20 px-6",children:(0,t.jsxs)("div",{className:"max-w-4xl mx-auto",children:[(0,t.jsx)(r.motion.h1,{className:"text-5xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent",initial:{opacity:0,y:20},animate:{opacity:1,y:0},children:"All Posts"}),(0,t.jsx)(r.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.1},className:"mb-6",children:(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("svg",{className:"absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})}),(0,t.jsx)("input",{type:"text",placeholder:"Search posts...",value:e,onChange:e=>i(e.target.value),className:"w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"}),e&&(0,t.jsx)("button",{onClick:()=>i(""),className:"absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors",children:"✕"})]})}),(0,t.jsxs)(r.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.15},className:"mb-8 flex flex-wrap gap-2",children:[(0,t.jsx)("button",{onClick:()=>n(null),className:`text-sm px-3 py-1.5 rounded-full transition-all ${!a?"bg-blue-500 text-white":"bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"}`,children:"All"}),o.map(e=>(0,t.jsx)("button",{onClick:()=>n(a===e?null:e),className:`text-sm px-3 py-1.5 rounded-full transition-all ${a===e?"bg-purple-500 text-white":"bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"}`,children:e},e))]}),(0,t.jsxs)(r.motion.p,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.2},className:"text-gray-500 text-sm mb-6",children:[l.length," ",1===l.length?"post":"posts"," ",e||a?"found":"total"]}),(0,t.jsx)(x,{mode:"popLayout",children:(0,t.jsx)("div",{className:"space-y-6",children:l.map((e,s)=>(0,t.jsxs)(r.motion.a,{href:`/my-app/posts/${e.slug}`,layout:!0,initial:{opacity:0,x:-20},animate:{opacity:1,x:0},exit:{opacity:0,x:20},transition:{delay:.05*s,duration:.3},className:"block group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 hover:border-blue-500/50 transition-all",whileHover:{x:10},children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"}),(0,t.jsxs)("div",{className:"relative flex justify-between items-start",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"flex gap-2 mb-3",children:e.tags.map(e=>(0,t.jsx)("span",{className:"text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300",children:e},e))}),(0,t.jsx)("h2",{className:"text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors",children:e.title}),(0,t.jsx)("p",{className:"text-gray-400",children:e.excerpt})]}),(0,t.jsx)("span",{className:"text-gray-500 text-sm whitespace-nowrap ml-4",children:e.date})]})]},e.slug))})}),0===l.length&&(0,t.jsxs)(r.motion.div,{initial:{opacity:0},animate:{opacity:1},className:"text-center py-20",children:[(0,t.jsx)("p",{className:"text-gray-500 text-lg mb-2",children:"No posts found"}),(0,t.jsx)("p",{className:"text-gray-600",children:"Try a different search term or tag filter"})]})]})})}],6528)}]);