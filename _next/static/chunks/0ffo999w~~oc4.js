(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,49302,e=>{"use strict";var t=e.i(18050),r=e.i(47163);e.s(["BorderBeam",0,function({className:e,size:s=200,duration:a=15,anchor:i=90,borderWidth:o=1.5,colorFrom:n="#ffaa40",colorTo:l="#9c40ff",delay:c=0}){return(0,t.jsx)("div",{style:{"--size":s,"--duration":a,"--anchor":i,"--border-width":o,"--color-from":n,"--color-to":l,"--delay":`-${c}s`},className:(0,r.cn)("absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]","![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]","after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",e)})}])},30179,e=>{"use strict";let t=[{slug:"edge-computing-webassembly",title:"Edge Computing Meets WebAssembly",excerpt:"How WebAssembly is unlocking new possibilities for edge computing and server-side applications.",date:"2026-05-11",tags:["WebAssembly","Edge Computing"],content:`# Edge Computing Meets WebAssembly

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
4. **Start small**: Begin with auto-instrumentation, then add custom spans for business logic`},{slug:"building-mcp-servers",title:"Building MCP Servers: AI Tool Integration Standard",excerpt:"How Model Context Protocol is unifying AI tool integration and how to build production MCP servers.",date:"2026-05-11",tags:["AI","MCP","TypeScript","Developer Tools"],content:`# Building MCP Servers: AI Tool Integration Standard

Model Context Protocol (MCP) is becoming the de facto standard for AI tool integration. It provides LLMs a standardized way to discover and call external tools.

## Why MCP?

Before MCP, each AI app had its own tool integration. A GitHub plugin for one platform could not be used on another. MCP defines a unified protocol, enabling "write once, run anywhere."

## Core Architecture

MCP uses client-server architecture:

- **Host**: The app running the AI model (e.g. Cursor, Claude Desktop)
- **Client**: Manages connections to servers within the host
- **Server**: Exposes tools, resources, and prompts as a standalone service

## Hands-on: Build a File System MCP Server

\`\`\`typescript
import { Server } from "@modelcontextprotocol/sdk/server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import { readFile } from "fs/promises";

const server = new Server(
  { name: "fs-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name === "read_file") {
    const content = await readFile(req.params.arguments.path, "utf-8");
    return { content: [{ type: "text", text: content }] };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

## Best Practices

1. **Detailed tool descriptions**: LLMs rely on descriptions to decide when to call tools
2. **Input validation**: Use JSON Schema to strictly validate parameters
3. **Error handling**: Return structured error messages, not stack traces
4. **Idempotency**: Tool calls should be retryable

## Future Outlook

As the MCP ecosystem matures, databases, cloud services, and IoT devices are all being exposed as AI-callable tools through MCP. This signals the emergence of a native AI integration layer.`}];e.s(["getAllTags",0,function(){let e=new Set;return t.forEach(t=>t.tags.forEach(t=>e.add(t))),Array.from(e)},"getPostsByTag",0,function(e){return t.filter(t=>t.tags.includes(e))},"posts",0,t])},32796,e=>{"use strict";var t=e.i(18050),r=e.i(46932),s=e.i(30179),a=e.i(8027),i=e.i(49302);e.s(["default",0,function(){let e=(0,s.getAllTags)();return(0,t.jsxs)("div",{className:"min-h-screen relative",children:[(0,t.jsx)(a.Particles,{className:"absolute inset-0",quantity:50,color:"#ffffff"}),(0,t.jsx)("div",{className:"relative py-20 px-6 z-10",children:(0,t.jsxs)("div",{className:"max-w-6xl mx-auto",children:[(0,t.jsxs)(r.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"text-center mb-16",children:[(0,t.jsx)("h1",{className:"text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent",children:"Tags"}),(0,t.jsx)("p",{className:"text-gray-400",children:"Browse posts by topic"})]}),(0,t.jsx)("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6",children:e.map((e,a)=>{let o=(0,s.getPostsByTag)(e);return(0,t.jsxs)(r.motion.div,{className:"relative group rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm p-6 hover:border-purple-500/50 transition-all duration-300 overflow-hidden",initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{delay:.1*a},whileHover:{scale:1.02,y:-5},children:[(0,t.jsx)("div",{className:"absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity",children:(0,t.jsx)(i.BorderBeam,{size:200,duration:8,colorFrom:"#a855f7",colorTo:"#ec4899"})}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 mb-4",children:[(0,t.jsx)("span",{className:"text-3xl",children:"#"}),(0,t.jsx)("h2",{className:"text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent",children:e})]}),(0,t.jsxs)("p",{className:"text-gray-400 mb-4",children:[o.length," post",1!==o.length?"s":""]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:o.map(e=>(0,t.jsx)("a",{href:`/my-app/posts/${e.slug}`,className:"text-sm px-3 py-1.5 rounded-full bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/10 transition-all",children:e.title},e.slug))})]})]},e)})})]})})]})}])}]);