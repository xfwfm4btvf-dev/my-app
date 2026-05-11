1:"$Sreact.fragment"
2:I[24082,["/my-app/_next/static/chunks/0m4h73__dwv5q.js","/my-app/_next/static/chunks/0bn7sb9dt40_4.js","/my-app/_next/static/chunks/0hn0fksvameoa.js","/my-app/_next/static/chunks/0462ueivjeopl.js"],"default"]
b:I[97367,["/my-app/_next/static/chunks/0m4h73__dwv5q.js","/my-app/_next/static/chunks/0bn7sb9dt40_4.js"],"OutletBoundary"]
c:"$Sreact.suspense"
3:Tada,# HTTP/3 and QUIC: What Every Web Developer Needs to Know in 2026

HTTP/3, built on top of Google's QUIC protocol, has quietly become the dominant transport for web traffic. As of May 2026, over 40% of global web requests use HTTP/3. If you have not optimized for it yet, you are leaving performance on the table.

## What Changed From HTTP/2

HTTP/2 solved head-of-line blocking at the application layer with multiplexed streams, but it still ran over TCP. A single lost packet stalls ALL streams because TCP delivers data in order. This is TCP-level head-of-line blocking.

HTTP/3 fixes this by running over QUIC, which is built on UDP. Each stream is independently ordered. A lost packet on stream 3 does not affect streams 1, 2, or 4.

## The Real Performance Gains

**Connection setup**: QUIC combines transport and cryptographic handshakes into one round trip (0-RTT for returning connections). Compare this to TCP + TLS 1.3 which needs 2 round trips minimum.

```
TCP + TLS 1.3:  2 RTT  (~200ms on mobile)
QUIC 1-RTT:     1 RTT  (~100ms on mobile)
QUIC 0-RTT:     0 RTT  (~0ms for returning visitors)
```

**Mobile networks**: The gains are dramatic on lossy connections. A 2% packet loss rate that causes 300ms stalls in HTTP/2 causes near-zero impact in HTTP/3 because individual streams continue uninterrupted.

## Enabling HTTP/3 on Your Server

**Nginx** (1.25+):
```nginx
listen 443 quic reuseport;
listen 443 ssl;
add_header Alt-Svc 'h3=":443"; ma=86400';
ssl_protocols TLSv1.3;
```

**Caddy** (automatic):
```
example.com {
    tls admin@example.com
    # HTTP/3 enabled by default since v2.7
}
```

**Cloudflare** (zero config):
HTTP/3 is enabled by default on all plans. Just verify with browser DevTools Network tab.

## Client-Side Considerations

Most modern browsers negotiate HTTP/3 automatically via Alt-Svc headers. But for API clients and server-to-server communication:

```typescript
// Node.js 22+ with built-in HTTP/3 support
import { request } from 'node:http3';

const response = await request('https://api.example.com/data', {
  method: 'GET',
  headers: { 'Accept': 'application/json' }
});
```

## What to Watch

- **WebTransport API**: Browser-native QUIC streams for bidirectional communication, replacing WebSocket for new projects
- **QUIC datagrams**: Unreliable delivery for video streaming and gaming
- **Connection migration**: Seamless network switches (WiFi to cellular) without reconnection

## Bottom Line

If you run a content-heavy site, API, or real-time application, enable HTTP/3 today. The performance improvement on mobile and lossy networks is substantial, and most CDNs and modern servers support it with minimal configuration.

The protocol has graduated from experimental to essential. Make sure your stack reflects that.4:T923,# Passkeys: …年密码消亡的真正起点

三年前，Passkeys 还只是一个令人兴奋的概念验证。2026年，它已成为 Google、Apple 和 Microsoft 平台上的默认认证选项。超过 80% 的主流网站已支持 WebAuthn，密码的终结终于不再是空谈。

## Passkeys 到底是什么

Passkeys 基于 FIDO2/WebAuthn 标准，使用非对称加密替代传统密码。用户设备生成一对密钥：私钥安全存储在设备的安全芯片中（如 Apple Secure Enclave 或 Android Keystore），公钥注册到服务端。认证时，设备使用私钥对挑战进行签名，服务端用公钥验证。

关键优势在于：服务端从不存储可被泄露的秘密。即使数据库被盗，攻击者也无法利用公钥伪造认证。

## 浏览器与平台支持现状

2026年5月的数据显示，所有主流浏览器均完整支持 WebAuthn Level 3 规范。Chrome、Firefox、Safari 和 Edge 的 Passkey 支持率达到 98% 以上。跨设备同步也已成熟，Apple 的 iCloud Keychain、Google Password Manager 和第三方密码管理器（1Password、Bitwarden）都能无缝同步 Passkeys。

## 集成实战

在 Web 应用中集成 Passkeys 比想象简单。以 Node.js 后端为例：

```javascript
import { generateRegistrationOptions } from "@simplewebauthn/server";

const options = await generateRegistrationOptions({
  rpName: "My App",
  rpID: "example.com",
  userName: "user@example.com",
  authenticatorSelection: {
    residentKey: "preferred",
    userVerification: "preferred",
  },
});
```

前端使用 navigator.credentials.create() 和 navigator.credentials.get() 即可完成注册和认证流程。整个过程无需用户记忆任何密码。

## 实际挑战

Passkeys 并非没有痛点。跨平台迁移仍是主要障碍，从 iPhone 换到 Android 的用户可能面临 Passkeys 同步断裂。企业环境中，设备管理和 Passkey 分发策略仍在完善中。

另外，回退机制不可忽视。并非所有用户都有支持 Passkeys 的设备，因此保留邮箱加 TOTP 作为备选方案仍然必要。

## 结语

密码不会在一夜之间消失，但 Passkeys 的采用曲线已经越过临界点。对于新项目，现在就是集成 WebAuthn 的最佳时机。早一步拥抱无密码认证，用户就少一分凭证泄露的风险。5:T8d4,# Agentic Coding: From Autocomplete to Autonomous Programming

In 2024, Copilot-style code completion was the mainstream. By 2026, agentic coding tools like Claude Code, Codex, and Cursor Agent have become core components of developer daily workflows. These tools are no longer passive assistants waiting to provide suggestions.

## Three Levels of Agentic Coding

**Level 1: Context Completion** -- The traditional Copilot mode, predicting the next code based on cursor position.

**Level 2: Task Execution** -- Developers describe tasks in natural language, and the tool autonomously decomposes subtasks, modifies files across the codebase, and runs commands.

**Level 3: Engineering Autonomy** -- The agent can independently handle a complete feature branch: understanding requirements docs, designing solutions, writing code, submitting PRs, and responding to review comments.

## The Real Technical Challenges

The core difficulty is engineering context understanding and maintenance. A real project might have hundreds of thousands of lines of code, complex dependency graphs, and implicit architectural constraints.

Current solutions include: hierarchical code indexing and retrieval, structured project knowledge graphs, and context compression techniques across multi-turn conversations.

Another critical issue is determinism and controllability. Engineering teams need clear guardrails: which files can be modified, which operations require human confirmation, and how CI/CD pipelines validate agent output.

## Impact on the Developer Role

High-value developer capabilities in the agentic era:

- **System design and architectural decisions** -- Agents excel at implementation, but high-level design trade-offs require human judgment
- **Precise task description skills** -- Expressing technical intent precisely in natural language becomes a core skill
- **Code review and quality assurance** -- When 80% of code is agent-generated, reviewers shift to verifying architectural consistency

## Looking Ahead

We are in the midst of another major shift in software development methodology. Agentic coding will become the next standardized engineering practice. The key question is how to design the collaboration boundary between humans and agents.6:T93c,# Bun Runtime: The JavaScript Engine Revolution of 2026

The JavaScript runtime landscape has long been dominated by Node.js and Deno, but Bun has emerged as a serious contender that's redefining developer expectations for speed and simplicity.

## What Makes Bun Different

Bun isn't just another JavaScript runtime — it's an all-in-one toolkit written in Zig that bundles a bundler, transpiler, package manager, and test runner into a single binary. This consolidation eliminates the toolchain sprawl that has plagued JavaScript development.

## Performance Benchmarks

Bun's speed advantage is striking. In HTTP server benchmarks, Bun handles 3-5x more requests per second than Node.js. Package installation runs 25x faster than npm, and TypeScript compilation is virtually instant because Bun transpiles on-the-fly.

```typescript
// Bun's built-in HTTP server — no imports needed
Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello from Bun!", {
      headers: { "Content-Type": "text/plain" },
    });
  },
});
```

## Native TypeScript Support

Unlike Node.js which requires a build step for TypeScript, Bun runs `.ts` files directly. Combined with its built-in JSX support, this means zero configuration for most projects.

## Built-in SQLite and S3

Bun 1.2 introduced native SQLite and S3 client support — no npm packages required. This "batteries included" philosophy reduces dependency trees and simplifies deployment.

```typescript
// Built-in SQLite — no npm install needed
import { Database } from "bun:sqlite";
const db = new Database("app.db");
db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)");
db.prepare("INSERT INTO users (name) VALUES (?)").run("Alice");
```

## The Migration Path

Migrating from Node.js is surprisingly smooth. Bun implements Node.js APIs and resolves packages from `node_modules` by default. Most Express, Fastify, and Hono applications run without modification.

## When to Choose Bun in 2026

Bun excels for greenfield projects, development tooling, serverless functions, and any application where startup time and build speed matter. For production systems deeply integrated with Node.js native modules, thorough testing remains essential.

The runtime wars are far from over, but Bun has proven that the JavaScript ecosystem benefits from healthy competition.7:T552,# Database Indexing Strategies for High-Traffic Applications

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
3. **Not monitoring unused indexes**: Remove indexes that are never read.0:{"rsc":["$","$1","c",{"children":[[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"BlogPosting\",\"headline\":\"HTTP/3 and QUIC: What Every Web Developer Needs to Know in 2026\",\"description\":\"HTTP/3 adoption has crossed 40% of global web traffic. Understanding QUIC is no longer optional for performance-critical applications.\",\"datePublished\":\"2026-05-11\",\"dateModified\":\"2026-05-11\",\"author\":{\"@type\":\"Person\",\"name\":\"Henry Nitrogen\",\"url\":\"https://xfwfm4btvf-dev.github.io/my-app/about\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Nitrogen Blog\",\"url\":\"https://xfwfm4btvf-dev.github.io/my-app/\"},\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://xfwfm4btvf-dev.github.io/my-app/posts/http3-quic-web-developers-2026\"},\"keywords\":\"Web, Performance, Networking, DevOps\",\"wordCount\":413,\"articleSection\":\"Web\"}"}}],["$","$L2",null,{"post":{"slug":"http3-quic-web-developers-2026","title":"HTTP/3 and QUIC: What Every Web Developer Needs to Know in 2026","excerpt":"HTTP/3 adoption has crossed 40% of global web traffic. Understanding QUIC is no longer optional for performance-critical applications.","date":"2026-05-11","tags":["Web","Performance","Networking","DevOps"],"content":"$3"},"readingTime":3,"prevPost":{"slug":"passkeys-passwordless-auth-web-2026","title":"Passkeys: …年密码消亡的真正起点","excerpt":"Passkeys 已从实验性功能变成主流认证方式。本文解析其工作原理、浏览器支持现状，以及如何在你的项目中集成无密码登录。","date":"2026-05-11","tags":["安全","WebAuthn","身份认证","前端"],"content":"$4"},"nextPost":{"slug":"agentic-coding-reshaping-software-engineering","title":"Agentic Coding: From Autocomplete to Autonomous Programming","excerpt":"How AI coding tools evolved beyond autocomplete into autonomous engineering participants in 2026.","date":"2026-05-11","tags":["AI","DevTools","Software Engineering","LLM","Automation"],"content":"$5"},"relatedPosts":[{"slug":"bun-runtime-javascript-revolution-2026","title":"Bun Runtime: The JavaScript Engine Revolution of 2026","excerpt":"How Bun is reshaping the JavaScript ecosystem with its all-in-one toolkit approach and blazing-fast performance.","date":"2026-05-11","tags":["JavaScript","Performance","DevOps"],"content":"$6"},{"slug":"database-indexing-strategies","title":"Database Indexing Strategies for High-Traffic Applications","excerpt":"Master the art of database indexing to keep your application fast as it scales.","date":"2026-05-09","tags":["Database","Performance"],"content":"$7"},{"slug":"web-security-essentials","title":"Web Security Essentials for Modern Apps","excerpt":"Security is not optional. Learn the essential practices.","date":"2026-05-01","tags":["Security","Web"],"content":"# Web Security Essentials for Modern Apps\n\nSecurity must be a priority from day one.\n\n## OWASP Top 10\n\n1. Broken Access Control\n2. Cryptographic Failures\n3. Injection attacks\n4. Insecure Design\n5. Security Misconfiguration\n\n## Authentication Best Practices\n\n### Password Storage\n\n    import bcrypt from 'bcrypt';\n    const SALT_ROUNDS = 12;\n    async function hashPassword(password) {\n      return bcrypt.hash(password, SALT_ROUNDS);\n    }\n\n### JWT Security\n\n- Use short-lived tokens (15 minutes)\n- Implement refresh token rotation\n- Store in httpOnly cookies, not localStorage\n- Always validate iss and aud claims\n\n## Quick Wins\n\n1. Enable HTTPS everywhere\n2. Sanitize user input\n3. Keep dependencies updated\n4. Implement rate limiting\n5. Log security events"}]}]],["$L8","$L9"],"$La"]}],"isPartial":false,"staleTime":300,"varyParams":null,"buildId":"Bs1NGJkrxWOdEpAn4-8Yl"}
8:["$","script","script-0",{"src":"/my-app/_next/static/chunks/0hn0fksvameoa.js","async":true}]
9:["$","script","script-1",{"src":"/my-app/_next/static/chunks/0462ueivjeopl.js","async":true}]
a:["$","$Lb",null,{"children":["$","$c",null,{"name":"Next.MetadataOutlet","children":"$@d"}]}]
d:null
