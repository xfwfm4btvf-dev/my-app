1:"$Sreact.fragment"
2:I[24082,["/my-app/_next/static/chunks/0bn7sb9dt40_4.js","/my-app/_next/static/chunks/0hn0fksvameoa.js","/my-app/_next/static/chunks/0462ueivjeopl.js"],"default"]
b:I[97367,["/my-app/_next/static/chunks/0bn7sb9dt40_4.js"],"OutletBoundary"]
c:"$Sreact.suspense"
3:T4c9,# Container Queries: The End of Media Query Hacks

For years, responsive design meant media queries tied to viewport width. Container queries change everything by letting components respond to their own container's size.

## The Problem

A card component might appear in a 300px sidebar or a 900px main area. With media queries, you cannot differentiate — the viewport is the same in both cases.

## The Solution

```css
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
```

## Container Query Units

New CSS units like `cqw` (container query width) let you size elements relative to their container:

```css
.card-title {
  font-size: clamp(1rem, 3cqw, 1.5rem);
}
```

## Browser Support

Container queries have full support in all modern browsers as of 2025. You can safely use them in production without fallbacks.

## Best Practices

1. Use container queries for reusable components
2. Keep media queries for page-level layout
3. Name your containers for clarity in complex layouts4:T552,# Database Indexing Strategies for High-Traffic Applications

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

```sql
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 123
ORDER BY created_at DESC
LIMIT 10;
```

Look for "Seq Scan" (sequential scan) on large tables — that is a sign you need an index.

## Common Mistakes

1. **Over-indexing**: Each index adds write overhead. Only index columns used in WHERE, JOIN, and ORDER BY.
2. **Ignoring covering indexes**: Include all selected columns to avoid table lookups.
3. **Not monitoring unused indexes**: Remove indexes that are never read.5:T6e1,# The HTMX + Alpine.js Stack: Building Dynamic UIs Without React

The frontend ecosystem has long assumed that dynamic web applications require React, Vue, or Svelte. HTMX and Alpine.js are proving that assumption wrong — and the results are compelling for a large class of applications.

## The Philosophy: HTML as the Engine

HTMX extends HTML with attributes that trigger AJAX requests and swap DOM fragments. No virtual DOM, no build step, no client-side router:

    <button hx-get="/api/users" hx-target="#user-list" hx-swap="innerHTML">
      Load Users
    </button>
    <div id="user-list"></div>

That is the entire client-side code for loading and displaying users.

## Where Alpine.js Comes In

HTMX handles server communication; Alpine.js handles client-side interactivity. Together they cover the full spectrum:

- **HTMX**: Server requests, form submissions, infinite scroll, real-time updates via SSE
- **Alpine.js**: Dropdowns, modals, tabs, form validation, client-side state

    <div x-data="{ open: false }">
      <button @click="open = !open">Toggle</button>
      <div x-show="open" x-transition>Content here</div>
    </div>

## When This Stack Shines

This approach excels for content-driven applications: blogs, dashboards, admin panels, e-commerce catalogs. These are the applications where React adds complexity without proportional benefit. The HTMX+Alpine stack delivers interactivity with 90% less JavaScript, faster page loads, and simpler debugging.

## When to Stick With React

Complex client-side applications with rich interactions — real-time collaboration tools, design editors, spreadsheet apps — genuinely benefit from a component framework. The key insight is that most web applications are not in this category.6:T526,# Edge Computing Meets WebAssembly

The convergence of WebAssembly (Wasm) and edge computing is reshaping how we think about application deployment. Originally designed for browsers, Wasm's sandboxed execution model makes it a natural fit for edge environments.

## Why WebAssembly at the Edge

Traditional serverless functions suffer from cold starts. Wasm modules, by contrast, can instantiate in microseconds. This makes them ideal for latency-sensitive edge workloads like real-time personalization, A/B testing, and authentication.

## The WASI Standard

The WebAssembly System Interface (WASI) provides a standardized way for Wasm modules to interact with the host OS. This means your Wasm code can run identically across Cloudflare Workers, Fastly Compute, and Fermyon's Spin — truly write once, run anywhere.

## Getting Started

```rust
use spin_sdk::http::{Request, Response};

#[spin_sdk::http_component]
fn handle_request(req: Request) -> Response {
    Response::builder()
        .status(200)
        .body("Hello from the edge!")
        .build()
}
```

## The Future

With the Component Model proposal, Wasm modules will be able to compose and interoperate across languages. Imagine importing a Rust crypto library directly into your JavaScript edge function — that future is closer than you think.7:T6ff,# Building Resilient APIs with the Circuit Breaker Pattern

In distributed systems, failures are inevitable. The circuit breaker pattern prevents a single failing service from cascading into a system-wide outage.

## How It Works

A circuit breaker monitors calls to external services and "trips" (opens) when failures exceed a threshold. It has three states:

- **Closed**: Requests flow normally. Failures are counted.
- **Open**: Requests are immediately rejected with a fallback response.
- **Half-Open**: After a timeout, a limited number of test requests are allowed through.

## Implementation

```typescript
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
```

## Best Practices

1. **Use with retry logic**: Combine with exponential backoff for transient failures.
2. **Monitor circuit states**: Expose metrics for alerting when circuits open.
3. **Provide meaningful fallbacks**: Return cached data or degraded functionality instead of errors.0:{"rsc":["$","$1","c",{"children":[[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"BlogPosting\",\"headline\":\"Container Queries: The End of Media Query Hacks\",\"description\":\"CSS container queries let components respond to their own size, not just the viewport.\",\"datePublished\":\"2026-05-08\",\"dateModified\":\"2026-05-08\",\"author\":{\"@type\":\"Person\",\"name\":\"Henry Nitrogen\",\"url\":\"https://xfwfm4btvf-dev.github.io/my-app/about\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Nitrogen Blog\",\"url\":\"https://xfwfm4btvf-dev.github.io/my-app/\"},\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://xfwfm4btvf-dev.github.io/my-app/posts/css-container-queries\"},\"keywords\":\"CSS, Frontend\",\"wordCount\":183,\"articleSection\":\"CSS\"}"}}],["$","$L2",null,{"post":{"slug":"css-container-queries","title":"Container Queries: The End of Media Query Hacks","excerpt":"CSS container queries let components respond to their own size, not just the viewport.","date":"2026-05-08","tags":["CSS","Frontend"],"content":"$3"},"readingTime":1,"prevPost":{"slug":"mastering-typescript","title":"Mastering TypeScript: A Guide to Better JavaScript","excerpt":"TypeScript has become the gold standard for building robust web applications.","date":"2026-05-10","tags":["TypeScript","JavaScript"],"content":"# Mastering TypeScript: A Guide to Better JavaScript\n\nTypeScript has become the gold standard for building robust web applications. But many developers only scratch the surface.\n\n## Why TypeScript Matters\n\nJavaScript is dynamic. TypeScript adds static typing, catching bugs before production. Teams report 15-20% fewer bugs.\n\n## Advanced Patterns\n\n### Utility Types\n\n    interface User { id: number; name: string; }\n    type UpdateUser = Partial<User>;\n    type UserCredentials = Pick<User, 'email' | 'role'>;\n\n### Discriminated Unions\n\n    type ApiResponse<T> =\n      | { status: 'loading' }\n      | { status: 'success'; data: T }\n      | { status: 'error'; message: string };\n\n## Best Practices\n\n1. Avoid any - Use unknown instead\n2. Enable strict mode in tsconfig.json\n3. Use branded types for IDs\n4. Type your environment variables"},"nextPost":{"slug":"database-indexing-strategies","title":"Database Indexing Strategies for High-Traffic Applications","excerpt":"Master the art of database indexing to keep your application fast as it scales.","date":"2026-05-09","tags":["Database","Performance"],"content":"$4"},"relatedPosts":[{"slug":"htmx-alpine-javascript-free-2026","title":"The HTMX + Alpine.js Stack: Building Dynamic UIs Without React","excerpt":"How the HTMX and Alpine.js combination is challenging the SPA orthodoxy and delivering better developer experience for content-driven applications.","date":"2026-05-11","tags":["HTMX","Alpine.js","Frontend","Architecture","Web Development"],"content":"$5"},{"slug":"edge-computing-webassembly","title":"Edge Computing Meets WebAssembly","excerpt":"How WebAssembly is unlocking new possibilities for edge computing and server-side applications.","date":"2026-05-11","tags":["WebAssembly","Edge Computing"],"content":"$6"},{"slug":"circuit-breaker-pattern-apis","title":"Building Resilient APIs with the Circuit Breaker Pattern","excerpt":"Prevent cascading failures in distributed systems with the circuit breaker design pattern.","date":"2026-05-11","tags":["Architecture","APIs"],"content":"$7"}]}]],["$L8","$L9"],"$La"]}],"isPartial":false,"staleTime":300,"varyParams":null,"buildId":"tEVC1bf4k0DGXrcqPi4MX"}
8:["$","script","script-0",{"src":"/my-app/_next/static/chunks/0hn0fksvameoa.js","async":true}]
9:["$","script","script-1",{"src":"/my-app/_next/static/chunks/0462ueivjeopl.js","async":true}]
a:["$","$Lb",null,{"children":["$","$c",null,{"name":"Next.MetadataOutlet","children":"$@d"}]}]
d:null
