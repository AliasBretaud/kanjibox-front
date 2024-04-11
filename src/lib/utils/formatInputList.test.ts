import { formatInputList } from "./formatInputList";

describe("List parsing and format tests", () => {
  it("Build a list from a correct input", () => {
    const input = "Item1;  item 2;  item3   ";
    expect(formatInputList(input)).toEqual(["Item1", "Item 2", "Item3"]);
  });
  it("Parse a single entry", () => {
    const input = "single";
    expect(formatInputList(input)).toEqual(["Single"]);
  });
  it("Empty safe", () => {
    expect(formatInputList("")).toEqual([]);
  });
});
