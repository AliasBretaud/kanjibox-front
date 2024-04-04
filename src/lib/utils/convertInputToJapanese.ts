import { toKana, toKatakana } from "wanakana";

const convert = (input: string, transformFct: (val: string) => string) =>
  !(input.endsWith("n") || input.endsWith("ny"))
    ? transformFct(input).trim()
    : input.trim();

export const convertInputToHiragana = (input: string) => convert(input, toKana);

export const convertInputToKatakana = (input: string) =>
  convert(input, toKatakana);
