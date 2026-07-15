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
