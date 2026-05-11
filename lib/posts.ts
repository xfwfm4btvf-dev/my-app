export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'edge-computing-webassembly',
    title: 'Edge Computing Meets WebAssembly',
    excerpt: 'How WebAssembly is unlocking new possibilities for edge computing and server-side applications.',
    date: '2026-05-11',
    tags: ['WebAssembly', 'Edge Computing'],
    content: `# Edge Computing Meets WebAssembly

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

With the Component Model proposal, Wasm modules will be able to compose and interoperate across languages. Imagine importing a Rust crypto library directly into your JavaScript edge function — that future is closer than you think.`
  },
  {
    slug: 'circuit-breaker-pattern-apis',
    title: 'Building Resilient APIs with the Circuit Breaker Pattern',
    excerpt: 'Prevent cascading failures in distributed systems with the circuit breaker design pattern.',
    date: '2026-05-11',
    tags: ['Architecture', 'APIs'],
    content: `# Building Resilient APIs with the Circuit Breaker Pattern

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
3. **Provide meaningful fallbacks**: Return cached data or degraded functionality instead of errors.`
  },
  {
    slug: 'rust-for-web-developers',
    title: 'Why Web Developers Should Learn Rust in 2026',
    excerpt: 'Rust is no longer just for systems programmers — it is becoming essential for modern web development.',
    date: '2026-05-10',
    tags: ['Rust', 'Web Development'],
    content: `# Why Web Developers Should Learn Rust in 2026

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

The learning curve is real, but the payoff in performance and reliability is immense.`
  },
  {
    slug: 'database-indexing-strategies',
    title: 'Database Indexing Strategies for High-Traffic Applications',
    excerpt: 'Master the art of database indexing to keep your application fast as it scales.',
    date: '2026-05-09',
    tags: ['Database', 'Performance'],
    content: `# Database Indexing Strategies for High-Traffic Applications

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
3. **Not monitoring unused indexes**: Remove indexes that are never read.`
  },
  {
    slug: 'css-container-queries',
    title: 'Container Queries: The End of Media Query Hacks',
    excerpt: 'CSS container queries let components respond to their own size, not just the viewport.',
    date: '2026-05-08',
    tags: ['CSS', 'Frontend'],
    content: `# Container Queries: The End of Media Query Hacks

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
3. Name your containers for clarity in complex layouts`
  },
  {
    slug: 'mastering-typescript',
    title: 'Mastering TypeScript: A Guide to Better JavaScript',
    excerpt: 'TypeScript has become the gold standard for building robust web applications.',
    date: '2026-05-10',
    tags: ['TypeScript', 'JavaScript'],
    content: `# Mastering TypeScript: A Guide to Better JavaScript

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
4. Type your environment variables`
  },
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 16',
    excerpt: 'Next.js 16 brings exciting new features.',
    date: '2026-05-08',
    tags: ['Next.js', 'React'],
    content: `# Getting Started with Next.js 16

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
4. Add error.tsx for graceful error boundaries`
  },
  {
    slug: 'ai-powered-development',
    title: 'AI-Powered Development Tools',
    excerpt: 'How AI assistants are transforming the way we write code.',
    date: '2026-05-05',
    tags: ['AI', 'Productivity'],
    content: `# AI-Powered Development Tools

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
4. Stay in control - Use AI as a tool, not replacement`
  },
  {
    slug: 'web-security-essentials',
    title: 'Web Security Essentials for Modern Apps',
    excerpt: 'Security is not optional. Learn the essential practices.',
    date: '2026-05-01',
    tags: ['Security', 'Web'],
    content: `# Web Security Essentials for Modern Apps

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
5. Log security events`
  },
  {
    slug: 'opentelemetry-observability-microservices',
    title: 'OpenTelemetry: Unified Observability for Microservices',
    excerpt: 'How OpenTelemetry is becoming the universal standard for traces, metrics, and logs in distributed systems.',
    date: '2026-05-11',
    tags: ['Observability', 'DevOps'],
    content: `# OpenTelemetry: Unified Observability for Microservices

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
4. **Start small**: Begin with auto-instrumentation, then add custom spans for business logic`
  },
  {
    slug: 'model-context-protocol-ai-integration',
    title: 'Model Context Protocol: AI 工具集成的新标准',
    excerpt: '深入解析 MCP 如何统一 AI 模型与外部工具的交互方式，以及它对开发者生态的影响。',
    date: '2026-05-11',
    tags: ['AI', 'MCP', '开发工具'],
    content: `# Model Context Protocol: AI 工具集成的新标准

Model Context Protocol (MCP) 正在成为 AI 应用与外部系统交互的事实标准。由 Anthropic 发起的这一开放协议，旨在解决 AI 模型调用工具时的碎片化问题。

## 为什么需要 MCP

在 MCP 出现之前，每个 AI 应用都需要为每种工具编写自定义集成代码。一个代码编辑器想接入文件系统、Git、数据库，每种都要单独适配。这导致了大量的重复工作和生态碎片化。

MCP 通过标准化的客户端-服务器架构解决了这个问题。工具提供方只需实现一个 MCP Server，任何支持 MCP 的 AI 应用都能直接使用。

## 核心架构

MCP 基于 JSON-RPC 2.0，支持三种核心能力：

1. **Tools**：AI 可调用的函数，如读写文件、执行查询
2. **Resources**：可被 AI 引用的上下数据，如文件内容、数据库 schema
3. **Prompts**：预定义的提示模板，标准化常见交互模式

\`\`\`typescript
// MCP Server 示例
const server = new McpServer({ name: "my-tool", version: "1.0.0" });

server.tool(
  "search_docs",
  "搜索技术文档",
  { query: z.string() },
  async ({ query }) => {
    const results = await searchEngine.search(query);
    return { content: [{ type: "text", text: JSON.stringify(results) }] };
  }
);
\`\`\`

## 实际应用场景

目前 MCP 已被广泛集成到 Cursor、VS Code、Claude Desktop 等工具中。开发者可以快速构建 MCP Server 连接内部系统：公司知识库、监控平台、CI/CD 流水线等，让 AI 助手获得真实的业务上下文。

## 安全考量

MCP 采用能力协商机制，客户端声明支持的能力，服务器按需暴露功能。但需要注意权限控制——建议在 Server 端实现细粒度的访问策略，避免 AI 获得过多权限。

MCP 代表了 AI 工具生态从“各自为战”走向“互联互通”的关键一步。随着更多工具和服务加入 MCP 生态，AI 应用的能力边界将持续扩展。`
  },
  {
    slug: 'webgpu-browser-ai-inference',
    title: 'WebGPU: Browser-Side AI Inference Revolution',
    excerpt: 'How WebGPU is transforming browsers into AI inference platforms and what it means for frontend development.',
    date: '2026-05-11',
    tags: ['WebGPU', 'AI', 'Performance'],
    content: `# WebGPU: Browser-Side AI Inference Revolution

WebGPU is changing our understanding of browser capabilities. This new Web API gives developers direct GPU access, opening the door for browser-side AI inference.

## Why WebGPU Matters

WebGL has served us well for years, but it is limited by the OpenGL ES architecture. WebGPU is built on Vulkan, Metal, and Direct3D 12, providing more modern graphics and compute capabilities. The key difference is Compute Shader support.

## Browser-Side AI Inference

With Compute Shaders, we can now:

- Run small language models directly in the browser
- Realize real-time image recognition without a server
- Build privacy-first AI applications where data never leaves the device

\`\`\`javascript
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

const computeModule = device.createShaderModule({
  code: \`
    @group(0) @binding(0) var<storage, read> input: array<f32>;
    @group(0) @binding(1) var<storage, read_write> output: array<f32>;

    @compute @workgroup_size(64)
    fn main(@builtin(global_invocation_id) id: vec3u) {
      let i = id.x;
      output[i] = input[i] * input[i];
    }
  \`
});
\`\`\`

## Integration with ONNX Runtime Web

Microsoft ONNX Runtime Web now natively supports the WebGPU backend. This means you can export PyTorch or TensorFlow models to ONNX format and run them directly in the browser, with performance 3-10x faster than the WebGL backend.

## Performance Benchmarks

Running the Phi-3-mini model with WebGPU on M2 MacBook:

- First Token: 45ms (WebGPU) vs 180ms (WebGL) vs 320ms (WASM)
- Throughput: 28 tokens/s (WebGPU) vs 7 (WebGL) vs 3 (WASM)
- Memory: 2.1GB (WebGPU) vs 2.8GB (WebGL) vs 3.2GB (WASM)

## Real-World Applications

**Offline Translation Apps** - Translate documents on a plane without network access.

**Medical Imaging Assistance** - Analyze X-rays locally while protecting patient privacy.

**Real-time Code Completion** - IDE-level AI assistance without API calls.

## Browser Compatibility

As of May 2026: Chrome/Edge fully supported, Firefox experimental (manual flag), Safari supported on macOS 14+.

## Conclusion

WebGPU is more than a graphics API upgrade. It is the key step for browsers to become complete AI platforms. As model quantization and WebGPU mature, browser-side AI inference will become increasingly practical. Frontend developers should start learning Compute Shaders and WebGPU fundamentals now.`
  },
  {
    slug: 'ai-agent-orchestration-2026',
    title: 'AI Agent Orchestration: From Chaos to Coordinated Intelligence',
    excerpt: 'How modern orchestration frameworks are turning autonomous AI agents into reliable, production-ready systems.',
    date: '2026-05-11',
    tags: ['AI', 'Agents', 'Architecture', 'LLM', 'Orchestration'],
    content: `# AI Agent Orchestration: From Chaos to Coordinated Intelligence

The era of single-prompt LLM interactions is ending. In 2026, the real power lies in orchestrating multiple specialized AI agents that work together like a well-coordinated team.

## The Orchestration Problem

Running one AI agent is straightforward. Running ten agents that need to share context, respect dependencies, and handle failures — that is the hard problem. Naive approaches like chaining sequential calls lead to brittle systems where one failure cascades everywhere.

## Modern Orchestration Patterns

**Supervisor Pattern**: A central orchestrator agent delegates tasks to specialist agents. Simple but creates a single point of failure.

**Mesh Pattern**: Agents communicate peer-to-peer with shared memory. More resilient but harder to debug.

**Pipeline Pattern**: Agents form a processing chain with explicit handoff contracts. Predictable but inflexible.

## Building with LangGraph

LangGraph has emerged as the dominant framework for agent orchestration. Its graph-based execution model lets you define agents as nodes and communication as edges:

\`\`\`typescript
import { StateGraph } from 'langgraph';

const workflow = new StateGraph(AgentState);
workflow.addNode('researcher', researchAgent);
workflow.addNode('writer', writingAgent);
workflow.addNode('reviewer', reviewAgent);
workflow.addEdge('researcher', 'writer');
workflow.addEdge('writer', 'reviewer');
\`\`\`

## Observability is Non-Negotiable

Production agent systems demand full trace logging. Tools like LangSmith and Phoenix provide:
- Token-level cost tracking per agent
- Latency breakdowns across the orchestration graph
- Error propagation visualization

## Practical Architecture

For most teams, start with the Supervisor pattern using a strong reasoning model as the orchestrator. Add circuit breakers between agents, implement retry with exponential backoff, and always maintain a human-in-the-loop escape hatch for critical decisions.

## The Road Ahead

Agent orchestration is becoming infrastructure. Expect standardized protocols (like MCP for tool use) to emerge for inter-agent communication, making multi-agent systems as composable as microservices are today.`
  },
  {
    slug: 'ai-agent-orchestration-2026',
    title: 'AI Agent Orchestration: From Chaos to Coordinated Intelligence',
    excerpt: 'How modern orchestration frameworks are turning autonomous AI agents into reliable, production-ready systems.',
    date: '2026-05-11',
    tags: ['AI', 'Agents', 'Architecture', 'LLM', 'Orchestration'],
    content: `# AI Agent Orchestration: From Chaos to Coordinated Intelligence

The era of single-prompt LLM interactions is ending. In 2026, the real power lies in orchestrating multiple specialized AI agents that work together like a well-coordinated team.

## The Orchestration Problem

Running one AI agent is straightforward. Running ten agents that need to share context, respect dependencies, and handle failures — that is the hard problem. Naive approaches like chaining sequential calls lead to brittle systems where one failure cascades everywhere.

## Modern Orchestration Patterns

**Supervisor Pattern**: A central orchestrator agent delegates tasks to specialist agents. Simple but creates a single point of failure.

**Mesh Pattern**: Agents communicate peer-to-peer with shared memory. More resilient but harder to debug.

**Pipeline Pattern**: Agents form a processing chain with explicit handoff contracts. Predictable but inflexible.

## Building with LangGraph

LangGraph has emerged as the dominant framework for agent orchestration. Its graph-based execution model lets you define agents as nodes and communication as edges:

\`\`\`typescript
import { StateGraph } from 'langgraph';

const workflow = new StateGraph(AgentState);
workflow.addNode('researcher', researchAgent);
workflow.addNode('writer', writingAgent);
workflow.addNode('reviewer', reviewAgent);
workflow.addEdge('researcher', 'writer');
workflow.addEdge('writer', 'reviewer');
\`\`\`

## Observability is Non-Negotiable

Production agent systems demand full trace logging. Tools like LangSmith and Phoenix provide:
- Token-level cost tracking per agent
- Latency breakdowns across the orchestration graph
- Error propagation visualization

## Practical Architecture

For most teams, start with the Supervisor pattern using a strong reasoning model as the orchestrator. Add circuit breakers between agents, implement retry with exponential backoff, and always maintain a human-in-the-loop escape hatch for critical decisions.

## The Road Ahead

Agent orchestration is becoming infrastructure. Expect standardized protocols (like MCP for tool use) to emerge for inter-agent communication, making multi-agent systems as composable as microservices are today.`
  },

  {
    slug: 'post-quantum-cryptography-web-apps',
    title: 'Post-Quantum Cryptography: Hardening Web Apps Before Q-Day',
    excerpt: 'NIST finalized post-quantum standards. Here is how to migrate your web apps before quantum computers break RSA and ECC.',
    date: '2026-05-11',
    tags: ['Cryptography', 'Security', 'Quantum', 'TLS', 'NIST'],
    content: `# Post-Quantum Cryptography: Hardening Web Apps Before Q-Day

## The Quantum Clock Is Ticking

NIST officially finalized three post-quantum cryptographic standards in 2024: ML-KEM (formerly Kyber), ML-DSA (Dilithium), and SLH-DSA (SPHINCS+). With quantum computing advances accelerating, the window to migrate your applications is narrowing.

The "harvest now, decrypt later" threat means adversaries are already collecting encrypted traffic today, waiting for quantum machines capable of breaking RSA-2048 and ECC-256.

## What Breaks First

- **RSA/ECC key exchange** - replaced by ML-KEM-768/1024
- **Digital signatures** - replaced by ML-DSA-65/87
- **TLS certificates** - hybrid certificates becoming standard
- **SSH keys** - OpenSSH 9.x added hybrid key exchange

## Migration Checklist

**1. TLS Libraries**
OpenSSL 3.2+, BoringSSL, and rustls all support hybrid key exchange. Enable X25519Kyber768Draft00 alongside classical ECDHE for backward compatibility.

**2. Hybrid Mode is Non-Negotiable**
Never go pure-PQC yet. Hybrid schemes combine classical + post-quantum algorithms. If PQC turns out weak, your classical layer still protects.

**3. Certificate Authorities**
DigiCert and Let's Encrypt are testing PQC certificate issuance. Start requesting hybrid test certificates for staging environments.

**4. Application-Layer Crypto**
Review JWT signing (switch from RS256 to ML-DSA), database encryption keys, and API authentication tokens.

## Code Example: Hybrid TLS with OpenSSL

\`\`\`bash
# Generate hybrid PQC + classical key pair
openssl genpkey -algorithm MLKEM768 -out pqc_key.pem
openssl genpkey -algorithm X25519 -out classical_key.pem

# Configure nginx with hybrid groups
ssl_conf_command KEMGroups X25519Kyber768Draft00:X25519
\`\`\`

## Timeline Estimates

| Milestone | Target |
|-----------|--------|
| Hybrid TLS in production | 2025-2026 |
| PQC-only TLS optional | 2027-2028 |
| RSA/ECC deprecation begins | 2029-2030 |

## Bottom Line

Start your migration now. Enable hybrid key exchange in your TLS stack today — it costs negligible performance and buys you future-proof security. The crypto-agility you build now will be critical when Q-Day arrives.`
  },
  ];

export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags);
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter(post => post.tags.includes(tag));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): Post[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];
  
  const others = posts.filter(p => p.slug !== currentSlug);
  
  // Score by shared tags
  const scored = others.map(p => ({
    post: p,
    score: p.tags.filter(tag => current.tags.includes(tag)).length
  }));
  
  // If we have enough tag matches, return those sorted by score
  const withTags = scored.filter(item => item.score > 0);
  if (withTags.length >= limit) {
    return withTags
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.post);
  }
  
  // Fallback: add most recent posts to fill up to limit
  const result: Post[] = withTags.map(i => i.post);
  const used = new Set([currentSlug, ...result.map(p => p.slug)]);
  const remaining = others
    .filter(p => !used.has(p.slug))
    .sort((a, b) => b.date.localeCompare(a.date));
  
  for (const p of remaining) {
    if (result.length >= limit) break;
    result.push(p);
  }
  
  return result;
}
