---
title: "Passkeys: 2026年密码消亡的真正起点"
date: "2026-05-11"
tags: [安全, WebAuthn, 身份认证, 前端]
excerpt: "Passkeys 已从实验性功能变成主流认证方式。本文解析其工作原理、浏览器支持现状，以及如何在你的项目中集成无密码登录。"
---

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

密码不会在一夜之间消失，但 Passkeys 的采用曲线已经越过临界点。对于新项目，现在就是集成 WebAuthn 的最佳时机。早一步拥抱无密码认证，用户就少一分凭证泄露的风险。
