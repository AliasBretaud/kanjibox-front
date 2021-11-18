import Kanji from "./Kanji";

export default class Word {
  id?: number;
  value: string;
  furiganaValue: string;
  kanjis?: Kanji[];
  translation: string;

  constructor(s: {
    id?: number;
    value: string;
    furiganaValue: string;
    kanjis?: Kanji[];
    translation: string;
  }) {
    this.id = s.id;
    this.value = s.value;
    this.furiganaValue = s.furiganaValue;
    this.kanjis = s.kanjis;
    this.translation = s.translation;
  }
}
