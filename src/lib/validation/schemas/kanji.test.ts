import type { KanjiFormType } from "./kanji";
import { kanjiSchema } from "./kanji";
import type { ValidationReturnType } from "@/lib/validation/validateSchema";
import validateSchema from "@/lib/validation/validateSchema";

const formDataBase: KanjiFormType = {
  autoDetectReadings: false,
  value: "人",
  onYomi: "ジン;ニン",
  kunYomi: "ひと",
  translations: "Person;People",
};

it("Valid a kanji from the validation schema", () => {
  const res = validateSchema(kanjiSchema, formDataBase);
  expect(res.success).toBeTruthy();
});

describe("Validation tests for the `value` field", () => {
  it("Not kanji", () => {
    const formData = { ...formDataBase, value: "VAL" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "value");
  });

  it("Empty value", () => {
    const formData = { ...formDataBase, value: "" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "value");
  });

  it("Longer than 1 character", () => {
    const formData = { ...formDataBase, value: "漢字" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "value");
  });
});

describe("Validation tests for the `onYomi` field", () => {
  it("Empty value", () => {
    const formData = { ...formDataBase, onYomi: "" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "onYomi");
  });

  it("Empty splitted value", () => {
    const formData = { ...formDataBase, onYomi: "カ;;コ" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "onYomi");
  });

  it("Not katakana", () => {
    const formData = { ...formDataBase, onYomi: "カ;VAL" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "onYomi");
  });
});

describe("Validation tests for the `kunYomi` field", () => {
  it("Empty value", () => {
    const formData = { ...formDataBase, kunYomi: "" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "kunYomi");
  });

  it("Empty splitted value", () => {
    const formData = { ...formDataBase, kunYomi: "か;;こ" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "kunYomi");
  });

  it("Not hiragana", () => {
    const formData = { ...formDataBase, kunYomi: "か;VAL" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "kunYomi");
  });
});

describe("Validation tests for the `translations` field", () => {
  it("Empty value", () => {
    const formData = { ...formDataBase, translations: "" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "translations");
  });

  it("Empty splitted value", () => {
    const formData = { ...formDataBase, translations: "foo;;bar" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "translations");
  });

  it("Contains japanese", () => {
    const formData = { ...formDataBase, translations: "か;VAL" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "translations");
  });
});

describe("Validates auto-detect readings and translations", () => {
  it("Valid value", () => {
    const formData = { autoDetectReadings: true, value: "人" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeTruthy();
  });

  it("Invalid value", () => {
    const formData = { autoDetectReadings: true, value: "" };
    const res = validateSchema(kanjiSchema, formData);
    expect(res.success).toBeFalsy();
  });
});

const expectError = (
  res: ValidationReturnType<KanjiFormType>,
  path: keyof KanjiFormType,
) => {
  expect(res.errors?.[path]).toBeDefined();
};
