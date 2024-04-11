import { toKana, toKatakana } from "wanakana";

const convert = (input: string, transformFct: (val: string) => string) => {
  const val = input.replaceAll("nn", "ん");
  if (val.endsWith("n") || val.endsWith("ny")) {
    return val;
  }
  return transformFct(val.trim());
};

export const convertInputToHiragana = (input: string) => convert(input, toKana);

export const convertInputToKatakana = (input: string) =>
  convert(input, toKatakana);
