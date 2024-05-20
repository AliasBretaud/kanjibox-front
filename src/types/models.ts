import type { MappedValue } from "./utils";

export type $Kanji = {
  id?: number;
  value: string;
  kunYomi?: string[];
  onYomi?: string[];
  translations?: MappedValue<string, string[]>;
  usages?: string[];
};

export type $Word = {
  id?: number;
  value: string;
  furiganaValue?: string;
  kanjis?: $Kanji[];
  translations: MappedValue<string, string[]>;
};

export type $Message = {
  id: number;
  isAppMessage: boolean;
  isGenerating: boolean;
  createdAt: string;
  message: string;
  nextMessageId?: number;
};

export type $Conversation = {
  id: string;
  agent: string;
  lastUpdate: string;
  status: string;
};
