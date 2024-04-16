import type { ValidationReturnType } from "@/lib/validation/validateSchema";
import validateSchema from "@/lib/validation/validateSchema";
import { type WordFormType, wordSchema } from "./word";

const formDataBase: WordFormType = {
  value: "言葉",
  furiganaValue: "ことば",
  translations: ["words", "some words"],
};

it("Valid a word from the validation schema", () => {
  const res = validateSchema(wordSchema, formDataBase);
  expect(res.success).toBeTruthy();
});

describe("Validation tests for the `value` field", () => {
  it("Single character", () => {
    const formData = { ...formDataBase, value: "言" };
    const res = validateSchema(wordSchema, formData);
    expectError(res, "value");
  });

  it("Not japanese character", () => {
    const formData = { ...formDataBase, value: "言VAL" };
    const res = validateSchema(wordSchema, formData);
    expectError(res, "value");
  });

  it("Empty value", () => {
    const formData = { ...formDataBase, value: "" };
    const res = validateSchema(wordSchema, formData);
    expectError(res, "value");
  });
});

describe("Validation tests for the `furigana` field", () => {
  it("Not japanese character", () => {
    const formData = { ...formDataBase, furiganaValue: "V" };
    const res = validateSchema(wordSchema, formData);
    expectError(res, "furiganaValue");
  });

  it("Not allowed empty value", () => {
    const formData = { ...formDataBase, furiganaValue: "" };
    const res = validateSchema(wordSchema, formData);
    expectError(res, "furiganaValue");
  });

  it("Allowed empty value", () => {
    const formData = {
      ...formDataBase,
      value: "コンビニ",
      furiganaValue: undefined,
    };
    const res = validateSchema(wordSchema, formData);
    expect(res.success).toBeTruthy();
  });
});

describe("Validation tests for the `translations` field", () => {
  it("Empty value", () => {
    const formData = { ...formDataBase, translations: "" };
    const res = validateSchema(wordSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "translations");
  });

  it("Empty splitted value", () => {
    const formData = { ...formDataBase, translations: "foo;;bar" };
    const res = validateSchema(wordSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "translations");
  });

  it("Contains japanese", () => {
    const formData = { ...formDataBase, translations: "か;VAL" };
    const res = validateSchema(wordSchema, formData);
    expect(res.success).toBeFalsy();
    expectError(res, "translations");
  });
});

const expectError = (
  res: ValidationReturnType<WordFormType>,
  path: keyof WordFormType,
) => {
  expect(res.errors?.[path]).toBeDefined();
};
