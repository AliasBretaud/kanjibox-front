import type { MappedValue } from "./utils";

export type $Kanji = {
  id?: number;
  value: string;
  kunYomi?: string[];
  onYomi?: string[];
  translations?: MappedValue<string, string[]>;
};

export type $Word = {
  id?: number;
  value: string;
  furiganaValue: string;
  kanjis?: $Kanji[];
  translations: MappedValue<string, string[]>;
};
