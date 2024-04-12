import { buildUrl } from "./buildUrl";

describe("URL builder util tests", () => {
  it("Build a valid url", () => {
    const params = new URLSearchParams({ page: "2", locale: "en" });
    const url = buildUrl("http://test.com/test", params);
    expect(url.toString()).toBe("http://test.com/test?page=2&locale=en");
  });
  it("Works also without params", () => {
    const url = buildUrl("http://test.com/test");
    expect(url.toString()).toBe("http://test.com/test");
  });
});
