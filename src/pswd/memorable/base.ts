import { SYMBOLS } from "../../constants";
import type { MemorableOptions } from "../../types";
import { getSecureRandomInt, getSecureRandomIntInRange } from "../../utils/crypto";
import { capitalizeString } from "../../utils/string";

export const generateMemorableWithDefaultWordList = (
  wordList: readonly string[],
  options: Partial<MemorableOptions> = {},
): string => {
  const {
    capitalize = false,
    randomCapitalization = false,
    randomNumberBeginning = false,
    randomNumberEnd = false,
    separator = "space",
    wordCount = 6,
  } = options;

  let words: Array<string | number | undefined> = [];
  const wordListLength = wordList.length;

  for (let i = 0; i < wordCount; i++) {
    const index = getSecureRandomInt(wordListLength);
    const word = wordList[index];

    words.push(capitalize ? capitalizeString(word) : word);
  }

  if (randomCapitalization) {
    words = words.map((word) =>
      String(word)
        .split("")
        .map((letter) =>
          getSecureRandomInt(2) === 1 ? letter.toLowerCase() : letter.toUpperCase(),
        )
        .join(""),
    );
  }

  if (randomNumberBeginning) {
    words.unshift(getSecureRandomIntInRange(100, 999));
  }

  if (randomNumberEnd) {
    words.push(getSecureRandomIntInRange(100, 999));
  }

  if (separator === "symbol") {
    const last = words.pop();

    words = words.map((word) => {
      const randomSymbol = SYMBOLS[getSecureRandomInt(SYMBOLS.length)];

      return word + randomSymbol;
    });

    words.push(last);

    return words.filter(Boolean).join("");
  }

  const _separator = separator === "space" ? " " : separator === "dash" ? "-" : "";

  return words.join(_separator);
};
