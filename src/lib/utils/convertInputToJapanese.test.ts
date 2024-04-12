import {
  convertInputToHiragana,
  convertInputToKatakana,
} from "./convertInputToJapanese";

describe("Hiragana converter tests", () => {
  it("Convert valid value", () => {
    const res = convertInputToHiragana("neko");
    expect(res).toBe("ねこ");
  });

  it("Works with empty value", () => {
    const res = convertInputToHiragana("");
    expect(res).toBe("");
  });

  it("Don't convert the only 'n' character so that user can type hiraganas that begins \
    with the 'n' sound (eg: な に ぬ にゃ にゅ)", () => {
    expect(convertInputToHiragana("n")).toBe("n");
    expect(convertInputToHiragana("n ")).toBe("ん");
    expect(convertInputToHiragana("n\n")).toBe("ん");
    expect(convertInputToHiragana("na")).toBe("な");
    expect(convertInputToHiragana("nyu")).toBe("にゅ");
  });
});

describe("Katakana converter tests", () => {
  it("Convert valid value", () => {
    const res = convertInputToKatakana("neko");
    expect(res).toBe("ネコ");
  });

  it("Works with empty value", () => {
    const res = convertInputToKatakana("");
    expect(res).toBe("");
  });

  it("Don't convert the only 'n' character so that user can type hiraganas that begins \
      with the 'ン' sound (eg: ナ ニ ヌ ニャ ニュ)", () => {
    expect(convertInputToKatakana("n")).toBe("n");
    expect(convertInputToKatakana("n ")).toBe("ン");
    expect(convertInputToKatakana("n\n")).toBe("ン");
    expect(convertInputToKatakana("na")).toBe("ナ");
    expect(convertInputToKatakana("nyu")).toBe("ニュ");
  });
});
