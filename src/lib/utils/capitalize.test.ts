import capitalize from "./capitalize";

describe("Capitalize tests", () => {
  it("should capitalize the first letter of a string", () => {
    expect(capitalize("this is a test")).toStrictEqual("This is a test");
  });
  it("should be empty-safe", () => {
    expect("").toStrictEqual("");
  });
});
