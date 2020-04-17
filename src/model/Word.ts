import Kanji from "./Kanji";

export default interface Word {
  id?: number;
  value: string;
  furiganaValue: string;
  kanjis?: Kanji[];
  translation: string;
}
