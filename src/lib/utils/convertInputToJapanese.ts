import { toKana, toKatakana } from "wanakana";

type DefaultOptions = Parameters<typeof toKana>[1];

const convert = (
  input: string,
  transformFct: (val: string, options?: DefaultOptions) => string,
) => {
  const val = input.replaceAll("nn", "ん");
  if (val.endsWith("n") || val.endsWith("ny")) {
    return val;
  }
  return transformFct(val.trim(), {
    customKanaMapping: {
      ".": ".",
      "-": "-",
      "（": "（",
      "）": "）",
    },
  });
};

export const convertInputToHiragana = (input: string) => convert(input, toKana);

export const convertInputToKatakana = (input: string) =>
  convert(input, toKatakana);
