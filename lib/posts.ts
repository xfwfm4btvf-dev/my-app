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
  {
    slug: 'edge-native-databases',
    title: 'Edge-Native Databases: Data Where Your Users Are',
    excerpt: 'How edge-native databases are redefining data locality, latency, and offline-first architectures.',
    date: '2026-05-11',
    tags: ['Database', 'Edge Computing', 'Architecture'],
    content: `# Edge-Native Databases: Data Where Your Users Are

The traditional client-server model assumes a single, centralized database. Edge-native databases flip this model, placing data close to users across a global network of edge nodes.

## Why Centralized Databases Fall Short

A user in Tokyo querying a database in Virginia faces 150ms+ round-trip latency. For real-time collaboration, gaming, and IoT, this is unacceptable.

## The Edge-Native Approach

Edge-native databases replicate and partition data across geographic regions automatically:

- **Local-first reads**: Served from the nearest edge node
- **Conflict-free replication**: CRDTs handle concurrent writes
- **Offline support**: Apps work without connectivity, syncing when reconnected

## Popular Solutions

**Cloudflare D1**: SQLite at the edge, backed by Cloudflare global network.

**Turso (libSQL)**: Distributed SQLite with per-user databases for multi-tenant SaaS.

**Neon**: Serverless PostgreSQL with branching for dev workflows.

## Consistency Trade-offs

Edge databases typically offer eventual consistency. For strong consistency:

1. **Regional strong consistency**: Pin critical tables to a primary region
2. **Conflict resolution policies**: Define custom merge logic
3. **Hybrid approach**: Edge reads, centralized writes

## Architecture Patterns

**Read Replicas at Edge**: Main DB in one region, read replicas at edge. Simple but write latency unchanged.

**Multi-Primary with CRDTs**: Every edge node accepts writes. Complex but lowest latency.

**Tiered Storage**: Hot data at edge, warm in regional nodes, cold in central storage.

## When to Use

- Global SaaS with users across continents
- Real-time collaborative applications
- Offline-first mobile apps
- IoT data collection at scale

Start with one use case like user profiles, then expand as you build confidence.`
  },
  {
    slug: 'local-ai-deployment-patterns-2026',
    title: '本地AI部署：从实验到生产的三种架构模式',
    excerpt: '探讨本地AI从原型到生产的三种主流部署架构，以及各自适用场景与性能权衡。',
    date: '2026-05-11',
    tags: ['AI', 'Local-LLM', 'Privacy', 'Edge-Computing'],
    content: `随着大模型量化技术和推理引擎的成熟，本地AI部署正从极客玩具走向生产级应用。本文梳理三种主流架构模式，帮助开发者做出正确的技术选型。

## 模式一：嵌入式推理（Embedded Inference）

直接将推理引擎集成到应用中，适用于桌面应用和CLI工具。

**技术栈：** llama.cpp / MLX / ONNX Runtime

**典型场景：** 代码补全助手、离线翻译、文档摘要

**优势：** 零网络延迟，完全隐私，无需服务器基础设施

**关键指标：**
- M4 Pro运行7B模型：首Token约40ms，吞吐35 tokens/s
- 内存占用：INT4量化约4GB，INT8约7GB
- 启动时间：模型加载约2-3秒（SSD）

## 模式二：本地API网关（Local API Gateway）

在本地运行推理服务，通过类OpenAI API对外暴露，适合多应用共享模型。

**技术栈：** Ollama / vLLM / LocalAI

**典型场景：** 开发环境AI辅助、多工具共享模型、本地RAG管线

**优势：** 模型一次加载多处使用，统一API接口便于切换

## 模式三：混合推理（Hybrid Inference）

本地处理简单任务，复杂任务路由到云端，实现成本与隐私的最佳平衡。

**架构设计：**
- 路由层判断任务复杂度和敏感度
- 日常对话、代码片段 -> 本地7B模型
- 长文档分析、复杂推理 -> 云端70B+模型
- 含敏感数据的请求 -> 强制本地处理

**关键挘战：**
上下文同步是最大难点。本地和云端模型需要共享对话历史，否则用户体验割裂。推荐方案是使用结构化的会话格式，确保上下文可移植。

## 选型建议

- **单机桌面应用** -> 嵌入式推理（llama.cpp, MLX）
- **多工具共享** -> 本地API网关（Ollama, vLLM）
- **隐私敏感+复杂任务** -> 混合推理（自建路由层）

## 未来展望

随着WebGPU和移动端NPU算力提升，嵌入式推理将在浏览器和移动端普及。模型小型化趋势（如Phi-4-mini、Gemma-3-1B）进一步降低了本地运行门槛。2026年下半年，预计本地AI将成为大多数开发者工具的默认选项，而非特殊配置。
`  },
  {
    slug: 'zero-knowledge-web-auth-2026',
    title: 'Zero-Knowledge Proofs Are Revolutionizing Web Authentication',
    excerpt: 'How zero-knowledge proofs are eliminating password breaches and transforming how we prove identity online.',
    date: '2026-05-11',
    tags: ['Security', 'Cryptography', 'Web Development', 'Authentication'],
    content: `# Zero-Knowledge Proofs Are Revolutionizing Web Authentication

The biggest security news of 2026 is the mainstream adoption of zero-knowledge proofs (ZKPs) for web authentication.

## The Password Problem

Traditional authentication stores hashed passwords server-side. Even with bcrypt or argon2, a compromised database means millions of credentials are at risk. ZKPs flip this model entirely.

## How ZKP Authentication Works

Instead of sending your password to a server, you prove you *know* the password without revealing it:

1. **Commitment**: Your client generates a cryptographic commitment to your secret
2. **Challenge**: The server sends a random challenge
3. **Proof**: Your client computes a proof showing knowledge of the secret
4. **Verification**: The server verifies the proof learns nothing about your actual password

The server never stores, sees, or transmits your password — ever.

## Libraries Leading the Change

**SnarkJS** and **Circom** have matured into production-ready tools. **zkLogin** from Sui Foundation now handles millions of authentications daily. **Semaphore** enables anonymous group authentication for privacy-first applications.

## Real-World Impact

- **Financial services**: Banks adopting ZKP auth for regulatory compliance
- **Healthcare**: HIPAA-friendly authentication without storing PHI
- **Gaming**: Proving account ownership without exposing credentials

## Getting Started

Start with Semaphore for anonymous auth or zkLogin for OAuth-compatible ZKP flows. The learning curve is steep, but the security payoff is massive.

The passwordless future is proofs.`
  },

  {
    slug: 'local-ai-movement-2026',
    title: 'Why Local AI Is Becoming the Default Choice in 2026',
    excerpt: 'The shift from cloud-dependent AI to local inference is accelerating. Here is why privacy, cost, and latency are making local-first AI the new standard.',
    date: '2026-05-11',
    tags: ['AI', 'Local-LLM', 'Privacy', 'Edge-Computing'],
    content: `# Why Local AI Is Becoming the Default Choice in 2026

The conversation around AI has shifted. Two years ago, the question was "which cloud API should I use?" Today, it is "why am I sending my data to a third party at all?"

## The Three Forces Driving Local AI

**Privacy as a requirement, not a feature.** GDPR enforcement has intensified. Healthcare and legal sectors now mandate data residency. Running models locally eliminates the compliance headache entirely.

**Cost economics flipped.** A single H100 GPU inference setup costs less per month than equivalent API calls once you cross roughly 50M tokens. For teams with predictable workloads, local is now cheaper.

**Latency expectations rose.** Real-time applications like code completion and voice assistants cannot tolerate 200ms+ network round trips. Local inference delivers sub-50ms responses.

## What Actually Works Locally

The model landscape has matured significantly:

- **Qwen3 30B-A3B**: Runs on 8GB VRAM with impressive multilingual capabilities
- **Llama 4 Scout 109B**: MoE architecture activates only 17B parameters per token, fits on consumer hardware
- **DeepSeek R1 Distill**: Reasoning capabilities previously exclusive to cloud models
- **Whisper v4**: Speech-to-text that rivals commercial APIs at zero marginal cost

## The Tooling Stack

The infrastructure has caught up:

\`\`\`bash
# Ollama for quick model serving
ollama run qwen3:30b-a3b

# vLLM for production throughput
vllm serve Qwen/Qwen3-30B-A3B --gpu-memory-utilization 0.9

# llama.cpp for CPU inference
./llama-server -m model.gguf -c 4096 --port 8080
\`\`\`

## Hybrid Architecture Pattern

The smart play is not all-or-nothing. Use local models for routine tasks and escalate to cloud APIs for complex reasoning:

\`\`\`typescript
async function generateResponse(prompt: string) {
  // Try local first
  const localResult = await localLLM.generate(prompt, {
    maxTokens: 512,
    temperature: 0.7
  });

  // Check quality signal
  if (localResult.confidence > 0.85) {
    return localResult.text;
  }

  // Escalate to cloud for complex queries
  return await cloudAPI.generate(prompt);
}
\`\`\`

## Real-World Deployments

Companies running local AI in production:

- **Codeium**: Local completion for enterprise customers who cannot send code to external APIs
- **Brave Search**: On-device query understanding without cloud dependency
- **Signal**: Local message classification for spam detection, preserving E2E encryption

## What Still Needs Work

- **Model updates**: Keeping local models current requires manual orchestration
- **Multi-GPU scaling**: Not as seamless as cloud auto-scaling
- **Fine-tuning workflows**: Still more complex than API-based fine-tuning

## The Verdict

Local AI is not replacing cloud AI. It is becoming the default first layer, with cloud as the overflow and specialized capability provider. Every serious engineering team should have a local inference strategy by now.

The question is no longer "should we run AI locally?" It is "why are we still sending everything to the cloud?"`
  },
  {
    slug: 'zero-knowledge-proofs-web-apps-2026',
    title: 'Zero-Knowledge Proofs Are Finally Coming to Web Apps',
    excerpt: 'How ZK circuits running in the browser are enabling a new era of privacy-preserving web applications without sacrificing UX.',
    date: '2026-05-11',
    tags: ['Cryptography', 'ZKP', 'Privacy', 'Web Development', 'Security'],
    content: `# Zero-Knowledge Proofs Are Finally Coming to Web Apps

The cryptographic primitive that powered Zcash and blockchain rollups is now landing in your browser. Zero-Knowledge Proofs (ZKPs) let a user prove they know something without revealing the thing itself. In 2026, this is finally practical for mainstream web apps.

## Why Now?

Three converging trends made this possible:

1. **Browser-native WASM speed**: ZK proof generation used to take minutes. With optimized WASM backends (circom-wasm, snarkjs-ng), a proof generates in under 2 seconds on modern hardware.

2. **Proof size collapse**: Groth16 proofs are just 128 bytes. PLONK proofs are under 500 bytes. That is smaller than a typical API response payload.

3. **Regulatory pressure**: GDPR, California Privacy Act, and India DPDP Act all push toward data minimization. ZKPs let you verify without collecting.

## Real Use Cases Today

**Age Verification**: Prove you are over 18 without sharing your birthdate. The browser generates a ZK circuit from a government ID hash and outputs a binary true/false proof.

**Credit Score Ranges**: Prove your score is above 700 without revealing the exact number. Fintech apps are adopting this for loan pre-qualification.

**Credential Verification**: Prove you hold a valid degree or certification without revealing the institution or graduation year.

## Getting Started

The simplest path is @zk-kit/identity combined with circom circuits.

## The UX Challenge

The biggest barrier is user education. Nobody understands what generating a zero-knowledge proof means. The winning pattern is hiding it entirely. The proof generation happens silently in the background while the UI shows a simple verification badge.

## What is Next

Recursive proofs (proofs of proofs) are enabling composable verification chains. Imagine a job application where each credential check generates a proof, and all proofs roll up into a single 256-byte proof the employer verifies instantly.

The web is entering a new privacy era. ZKPs are the infrastructure that makes it real.`
  },
  {
    slug: 'rust-wasm-edge-computing-2026',
    title: 'Rust + WebAssembly: The New Default Stack for Edge Computing in 2026',
    excerpt: 'Why Rust compiled to WebAssembly is becoming the de facto standard for edge runtimes, and how to get started with the stack that is replacing Node.js at the edge.',
    date: '2026-05-11',
    tags: ['Rust', 'WebAssembly', 'Edge Computing', 'Serverless', 'Performance'],
    content: `# Rust + WebAssembly: The New Default Stack for Edge Computing in 2026

The edge computing landscape has consolidated around a clear winner in 2026: Rust compiled to WebAssembly. Cloudflare Workers, Fastly Compute, Deno Deploy, and Fermyon Spin all now optimize for the Rust+WASM combo, and the performance numbers explain why.

## Why Rust+WASM Won at the Edge

Edge runtimes impose strict constraints: cold starts under 5ms, memory limits of 128MB, and CPU time quotas measured in milliseconds. Traditional container-based deployments cannot meet these requirements. WASM modules start in microseconds and run in sandboxed isolation without the overhead of a full OS.

Rust fits this model perfectly. Its zero-cost abstractions, lack of a garbage collector, and predictable memory usage produce WASM binaries that are typically 10x smaller than equivalent Go or Java modules.

## The Performance Gap Is Real

- **Cold start**: 0.5-2ms (WASM) vs 50-200ms (Node.js containers)
- **Memory usage**: 2-8MB typical vs 30-80MB for Node.js
- **Throughput**: 2-5x higher requests/second at the same CPU quota
- **P99 latency**: 40-60% lower tail latency due to no GC pauses

## Getting Started

    use worker::*;
    #[event(fetch)]
    async fn main(req: Request, env: Env, _ctx: Context) -> Result<Response> {
        let router = Router::new();
        router.get_async("/api/data", handle_data).run(req, env).await
    }

## What This Means for Web Developers

The shift to Rust+WASM at the edge changes deployment economics. With sub-millisecond cold starts and minimal memory footprints, platforms can pack thousands of edge workers on a single machine. This directly translates to lower costs and higher free-tier limits.`
  },
  {
    slug: 'typescript-5-7-2026',
    title: 'TypeScript 5.7: Pattern Matching and Beyond',
    excerpt: 'TypeScript 5.7 finally introduces native pattern matching, bringing one of the most requested features to the language.',
    date: '2026-05-11',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Web Development'],
    content: `# TypeScript 5.7: Pattern Matching and Beyond

TypeScript 5.7 shipped with the feature developers have been requesting since 2018: native pattern matching. Combined with exhaustiveness checking and improved type narrowing, this release fundamentally changes how we write conditional logic.

## Pattern Matching Syntax

The new match expression replaces nested ternaries and switch statements with a declarative, type-safe construct:

    type Shape =
      | { kind: "circle"; radius: number }
      | { kind: "rectangle"; width: number; height: number };

    function area(shape: Shape): number {
      return match(shape) {
        { kind: "circle", radius: r }: Math.PI * r ** 2,
        { kind: "rectangle", width: w, height: h }: w * h,
      };
    }

The compiler enforces exhaustiveness — missing a case is a compile error, not a runtime crash.

## Why This Matters

Pattern matching eliminates entire categories of bugs. The exhaustive checking means your code cannot silently fail when a new variant is added. Refactoring becomes safer because the compiler tells you exactly which match expressions need updating.

## Migration Path

The feature is backward compatible. Existing switch statements continue to work. Start with discriminated unions, then expand to more complex patterns as the team gets comfortable.

## Performance Impact

Pattern matching compiles to optimized if-else chains — there is no runtime overhead compared to hand-written conditionals. The real win is developer productivity and code clarity.`
  },
  {
    slug: 'htmx-alpine-javascript-free-2026',
    title: 'The HTMX + Alpine.js Stack: Building Dynamic UIs Without React',
    excerpt: 'How the HTMX and Alpine.js combination is challenging the SPA orthodoxy and delivering better developer experience for content-driven applications.',
    date: '2026-05-11',
    tags: ['HTMX', 'Alpine.js', 'Frontend', 'Architecture', 'Web Development'],
    content: `# The HTMX + Alpine.js Stack: Building Dynamic UIs Without React

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

Complex client-side applications with rich interactions — real-time collaboration tools, design editors, spreadsheet apps — genuinely benefit from a component framework. The key insight is that most web applications are not in this category.`
  },
  {
    slug: 'biome-js-linter-2026',
    title: 'Biome: The Rust-Powered JavaScript Toolchain Replacing ESLint and Prettier',
    excerpt: 'How Biome is consolidating linting and formatting into a single, blazingly fast tool — and why the ecosystem is embracing it.',
    date: '2026-05-11',
    tags: ['JavaScript', 'Tooling', 'Rust', 'Developer Experience'],
    content: `# Biome: The Rust-Powered JavaScript Toolchain Replacing ESLint and Prettier

The JavaScript tooling ecosystem is consolidating around Rust. After SWC replaced Babel and Turbopack replaced Webpack, the next target is linting and formatting. Biome — the Rust successor to Rome — is now the fastest all-in-one JavaScript toolchain.

## Why Biome Exists

Running ESLint + Prettier on a large codebase is painfully slow. A monorepo with 500K lines of TypeScript can take 30-60 seconds for a full lint pass. Biome does the same job in under 2 seconds.

The speed advantage comes from Rust zero-cost abstractions and Biome parallel architecture. It parses JavaScript and TypeScript into a CST once, then runs lint rules and formatting in a single pass.

## What Biome Replaces

- **ESLint**: 95% of common rules covered, including TypeScript-specific rules
- **Prettier**: Full formatting support with compatible output
- **eslint-plugin-import**: Import sorting built-in

## Migration Path

Biome is designed for incremental adoption. Start by running it alongside ESLint and Prettier:

1. Install biome: npm install --save-dev @biomejs/biome
2. Run biome check --write . to auto-fix safe issues
3. Compare output with your existing config
4. Gradually disable ESLint rules as Biome coverage improves

## Real-World Impact

Teams adopting Biome report:
- CI pipeline time reduced by 40-60%
- Developer feedback loop from 15s to 0.5s (watch mode)
- Fewer config files to maintain (one biome.json vs .eslintrc + .prettierrc + tsconfig)

## The Bigger Picture

Biome represents the maturation of the Rust-for-JavaScript tooling movement. The pattern is clear: identify the slowest tool in the pipeline, rewrite it in Rust, deliver 10-100x speedup. With SWC, Turbopack, and Biome, the JavaScript build and development toolchain is now almost entirely Rust-powered.`
  },

  {
    slug: 'observability-2026-otel-native',
    title: 'OpenTelemetry Native: The End of Bolt-On Observability',
    excerpt: 'How frameworks and languages are building OpenTelemetry support directly into their cores, eliminating the sidecar pattern and its overhead.',
    date: '2026-05-11',
    tags: ['Observability', 'OpenTelemetry', 'DevOps', 'Monitoring', 'SRE'],
    content: `# OpenTelemetry Native: The End of Bolt-On Observability

The observability landscape has shifted from "add OpenTelemetry to your app" to "your app framework already has OpenTelemetry built in." This transition is changing how teams instrument and monitor production systems.

## The Problem With Bolt-On

Traditional OpenTelemetry integration required adding SDKs, configuring exporters, and managing agent sidecars. The result was inconsistent instrumentation, high memory overhead from duplicate agents, and configuration drift across services.

## Native Integration in 2026

Major frameworks now ship with built-in OpenTelemetry:

- **Rust**: Axum 0.8 and Actix-web 5.0 emit traces by default
- **Go**: The standard library net/http package gained OTel middleware
- **Node.js**: Express 5 and Fastify 5 auto-instrument HTTP handlers
- **Python**: FastAPI 0.115 includes auto-instrumented endpoints
- **Java**: Spring Boot 3.3 instruments every controller out of the box

The developer experience is dramatically simpler: import the framework, configure an OTLP endpoint, and you get traces, metrics, and logs for free.

## What This Means for SRE Teams

Native observability eliminates the instrumentation gap. Every request is traced, every database query is measured, every error is correlated. The "we forgot to instrument that service" problem disappears.

More importantly, it reduces the observability tax. Native instrumentation is typically 2-5x more efficient than agent-based approaches because it avoids context switches, serialization overhead, and sidecar network hops.

## The Migration Path

For existing applications, upgrade to the latest framework version, configure the OTLP exporter, and remove the old instrumentation agents. Most teams complete the migration in a sprint or two.`
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
