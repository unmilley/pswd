# @unmilley/pswd

> Generate secure passwords, memorable passphrases, and PIN codes with a lightweight, zero-dependency TypeScript library.

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![TypeScript][TypeScript-src]][TypeScript-href]
[![License][license-src]][license-href]

<!-- docs2readme:table:start -->

- [Why this package?](#why-this-package)
- [Installation](#installation)
- [API](#api)
  - [`generatePassword()`](#generatepasswordoptions)
  - [`generateMemorableLite()`](#generatememorableliteoptions)
  - [`generateMemorable()`](#generatememorableoptions)
  - [`generatePin()`](#generatepinoptions)
- [FAQ](#faq)
- [Security](#security)
- [Development](#development)
- [License](#license)

<!-- docs2readme:table:end -->

<!-- docs2readme:docs:start -->

## Why this package?

There are plenty of password generators available, but many are either too limited, overly complex, or focused on only one use case.

`@unmilley/pswd` was built to provide a single, lightweight solution for generating secure passwords, memorable passphrases, and numeric PIN codes through a simple, consistent API.

### Why choose `@unmilley/pswd`?

- 🔐 **Cryptographically secure** — Uses the runtime's secure random number generator instead of `Math.random()`.
- ⚡ **Lightweight** — Zero runtime dependencies with a minimal footprint.
- 📝 **Multiple generators** — Create strong passwords, memorable passphrases, Lite passphrases, and secure PIN codes.
- 🎛️ **Highly customizable** — Configure length, character sets, separators, capitalization, symbols, and more.
- 🌍 **Cross-platform** — Works in Node.js, Bun, Deno, and modern browsers.
- 💙 **TypeScript-first** — Written in TypeScript with built-in type definitions.
- 🚀 **Developer-friendly** — Simple API with sensible defaults and comprehensive documentation.

Whether you're building authentication systems, CLI tools, web applications, browser extensions, or developer utilities, `@unmilley/pswd` provides a flexible and secure way to generate credentials for virtually any use case.

## Installation

Install the package using your preferred package manager.

```bash
npm install @unmilley/pswd

pnpm add @unmilley/pswd

yarn add @unmilley/pswd

bun add @unmilley/pswd
```

# API

## `generatePassword(options?)`

Generates a cryptographically secure random password.

### Signature

```ts
generatePassword(options?: PasswordOptions): string;
```

### Parameters

#### `PasswordOptions`

| Property         | Type      | Default | Description                                                         |
| ---------------- | --------- | ------- | ------------------------------------------------------------------- |
| `length`         | `number`  | `16`    | Length of the generated password.                                   |
| `includeUpper`   | `boolean` | `true`  | Include uppercase letters (`A-Z`).                                  |
| `includeLower`   | `boolean` | `true`  | Include lowercase letters (`a-z`).                                  |
| `includeNumbers` | `boolean` | `true`  | Include numeric characters (`0-9`).                                 |
| `includeSymbols` | `boolean` | `false` | Include special characters.                                         |
| `excludeSimilar` | `boolean` | `false` | Exclude visually similar characters such as `0`, `O`, `I`, and `l`. |
| `customSymbols`  | `string`  | `""`    | Additional symbols to include.                                      |
| `excludeSymbols` | `string`  | `""`    | Symbols to exclude from the generated password.                     |

A cryptographically secure password.

### Example

```ts
import { generatePassword } from "@unmilley/pswd";

const password = generatePassword({
  length: 24,
  includeSymbols: true,
  excludeSimilar: true,
});

console.log(password);
```

## `generateMemorableLite(options?)`

Generates a memorable passphrase using the Lite built-in dictionary.

The Lite version is optimized for smaller bundle sizes while preserving the same API and customization options.

### Signature

```ts
generateMemorableLite(
  wordList: string[]
  options?: MemorableOptions
): string;
```

### Parameters

A memorable passphrase generated from the your list.

#### `MemorableOptions`

| Property                | Type                                      | Default  | Description                                  |
| ----------------------- | ----------------------------------------- | -------- | -------------------------------------------- |
| `wordCount`             | `number`                                  | `4`      | Number of words to generate.                 |
| `separator`             | `"space" \| "dash" \| "symbol" \| "none"` | `"dash"` | Separator placed between words.              |
| `capitalize`            | `boolean`                                 | `false`  | Capitalize the first letter of each word.    |
| `randomCapitalization`  | `boolean`                                 | `false`  | Randomly capitalize characters within words. |
| `randomNumberBeginning` | `boolean`                                 | `false`  | Prefix the passphrase with a random number.  |
| `randomNumberEnd`       | `boolean`                                 | `false`  | Append a random number to the passphrase.    |

### Example

```ts
import { generateMemorableLite } from "@unmilley/pswd";

const phrase = generateMemorableLite(["apple", "banana", "orange", "grape", "melon"], {
  wordCount: 3,
});

console.log(phrase);
```

## `generateMemorable(options?)`

Generates a memorable passphrase using the standard built-in dictionary.

> [!IMPORTANT]
> This version uses a predefined list of words,
> so an array of 7,777 values will be loaded during import.

### Signature

```ts
generateMemorable(options?: MemorableOptions): string;
```

### Parameters

[`MemorableOptions`](#MemorableOptions)

### Example

```ts
import { generateMemorable } from "@unmilley/pswd/memorable";

const phrase = generateMemorable({
  wordCount: 4,
  separator: "dash",
  capitalize: true,
});

console.log(phrase);
```

## `generatePin(options?)`

Generates a cryptographically secure numeric PIN.

### Signature

```ts
generatePin(options?: PinOptions): string;
```

### Parameters

#### `PinOptions`

| Property    | Type     | Default | Description                  |
| ----------- | -------- | ------- | ---------------------------- |
| `pinLength` | `number` | `6`     | Length of the generated PIN. |

A randomly generated numeric PIN.

### Example

```ts
import { generatePin } from "@unmilley/pswd";

const pin = generatePin({
  pinLength: 6,
});

console.log(pin);
```

# FAQ

## Is it cryptographically secure?

Yes. `@unmilley/pswd` uses the cryptographically secure random number generator ([CSPRNG](https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator)) provided by the runtime environment. It does **not** rely on `Math.random()`, making it suitable for generating passwords, passphrases, and PIN codes for real-world applications.

## Can I use it in the browser?

Yes. The package works in modern browsers that support the Web Crypto API.

```ts
import { generatePassword } from "@unmilley/pswd";

const password = generatePassword();

console.log(password);
```

## Does it work with Node.js?

Yes. `@unmilley/pswd` fully supports modern versions of Node.js and uses the native cryptographic APIs available in the runtime.

## Does it work with Bun?

Yes. Bun implements the required cryptographic APIs, so the package works out of the box.

## Does it work with Deno?

Yes. The library is compatible with Deno environments that provide the standard Web Crypto API.

## How does the Lite version differ?

The Lite version doesn't come with its own dictionary you'll need to add one.

It is ideal when:

- minimizing bundle size is important;
- you're building browser applications;
- you don't require a large word list.

The API is identical to the standard memorable passphrase generator, making it easy to switch between versions.

## Can I provide my own word list?

Yes.

That's the whole point of the lite version

```ts
import { generateMemorableLite } from "@unmilley/pswd";

const phrase = generateMemorableLite({
  wordList: ["apple", "banana", "orange", "grape"],
  wordCount: 3,
});

console.log(phrase);
```

## Can I exclude confusing characters?

Yes.

Enable the `excludeSimilar` option to remove ambiguous characters such as:

- `0` and `O`
- `I` and `l`
- `1` and `l`

```ts
import { generatePassword } from "@unmilley/pswd";

const password = generatePassword({
  excludeSimilar: true,
});
```

## Can I customize which symbols are used?

Yes.

Use `customSymbols` to include only specific symbols, or `excludeSymbols` to remove unwanted ones.

```ts
import { generatePassword } from "@unmilley/pswd";

const password = generatePassword({
  includeSymbols: true,
  customSymbols: "@#$%",
});
```

Or exclude specific symbols:

```ts
import { generatePassword } from "@unmilley/pswd";

const password = generatePassword({
  includeSymbols: true,
  excludeSymbols: "<>{}[]",
});
```

## Is TypeScript supported?

Absolutely.

The package is written entirely in TypeScript and ships with built-in type definitions. No additional `@types` package is required.

## Does the package have any runtime dependencies?

No.

`@unmilley/pswd` has **zero runtime dependencies**, helping reduce bundle size, installation time, and the overall supply-chain attack surface.

## Can I use this package in production?

Yes.

The library is designed for production use and relies on cryptographically secure random number generation provided by the host runtime. It can be used in web applications, backend services, CLIs, developer tools, and automation scripts.

## Which generator should I use?

| Use case                     | Recommended generator     |
| ---------------------------- | ------------------------- |
| Strong passwords             | `generatePassword()`      |
| Easy-to-remember credentials | `generateMemorable()`     |
| Smaller bundle size          | `generateMemorableLite()` |
| Numeric authentication codes | `generatePin()`           |

## Are generated values unique?

Each password, passphrase, or PIN is generated independently using secure random values. While collisions are theoretically possible—as with any random generator—they are extremely unlikely when using appropriate lengths and settings.

## Do I need to configure anything before using the package?

No.

Simply install the package, import the desired generator, and start generating passwords, passphrases, or PIN codes. No environment variables, configuration files, or initialization steps are required.

# Security

Security is the primary goal of `@unmilley/pswd`. The library is designed to generate cryptographically secure passwords, passphrases, and PIN codes using the secure random number generator provided by the host runtime.

## Cryptographically Secure Randomness

`@unmilley/pswd` relies on the runtime's cryptographically secure random number generator ([CSPRNG](https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator)), such as:

- **Web Crypto API** in modern browsers
- **Node.js Crypto API**
- Compatible cryptographic APIs in **Bun** and **Deno**

The library **does not** use `Math.random()` for any security-sensitive operations.

## Best Practices

To maximize security, consider the following recommendations:

- Use passwords with a minimum length of **16 characters**.
- Enable symbols for higher entropy whenever supported.
- Use memorable passphrases when human memorability is more important than complexity.
- Use PINs with at least **6 digits**, or **8+ digits** for higher-security applications.
- Store generated credentials securely using a trusted password manager or encrypted storage.
- Never hardcode passwords or secrets in your source code.

## Important Notes

While `@unmilley/pswd` generates secure credentials, overall application security also depends on how those credentials are stored, transmitted, and managed.

For example:

- Use HTTPS for transmitting credentials.
- Store passwords using a strong password hashing algorithm (such as Argon2, bcrypt, or scrypt).
- Rotate sensitive credentials when appropriate.
- Follow your organization's security policies and industry best practices.

## Responsible Usage

`@unmilley/pswd` is intended for legitimate security and authentication use cases, including:

- User account passwords
- API keys and secrets
- Temporary credentials
- Recovery codes
- Numeric PINs
- Multi-factor authentication (MFA) workflows

## Reporting Security Issues

If you discover a security vulnerability, please **do not** open a public GitHub issue.

Instead, report it privately by contacting the project maintainer or using GitHub's **Private Vulnerability Reporting** feature (if enabled). This helps ensure vulnerabilities can be investigated and resolved responsibly before public disclosure.

<!-- docs2readme:docs:end -->

## Development

<details>

<summary>local development</summary>

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

</details>

## License

[MIT][license-href]. Made with 💛

[npm-version-src]: https://img.shields.io/npm/v/@unmilley/pswd?style=flat&labelColor=18181B&color=fbd38d
[npm-version-href]: https://npmjs.com/package/@unmilley/pswd
[npm-downloads-src]: https://img.shields.io/npm/dm/@unmilley/pswd?style=flat&labelColor=18181B&color=fbd38d
[npm-downloads-href]: https://npmjs.com/package/@unmilley/pswd
[typescript-src]: https://img.shields.io/badge/100%25-3178C6?style=flat&logo=typescript&logoColor=white&labelColor=18181B&color=fbd38d
[typescript-href]: https://www.typescriptlang.org
[license-src]: https://img.shields.io/github/license/unmilley/pswd.svg?style=flat&labelColor=18181B&color=fbd38d
[license-href]: https://github.com/unmilley/pswd/blob/main/LICENSE
