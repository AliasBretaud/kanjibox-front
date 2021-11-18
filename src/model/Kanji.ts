export default class Kanji {
  id?: number;
  value: string;
  kunYomi?: string[];
  onYomi?: string[];
  translations?: string[];

  constructor(s: {
    value: string;
    kunYomi: string[];
    onYomi: string[];
    translations: string[];
  }) {
    this.value = s.value;
    this.kunYomi = s.kunYomi;
    this.onYomi = s.onYomi;
    this.translations = s.translations;
  }
}
