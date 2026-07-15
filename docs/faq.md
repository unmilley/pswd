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
