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
