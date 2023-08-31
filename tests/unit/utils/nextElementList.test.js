import { nextElementList } from "@/utils/nextElementList";

describe("nextElementList", () => {
  it("locates element in list and return the next element", () => {
    const list = ["a", "b", "c"];
    const value = "b";
    const expected = "c";
    const actual = nextElementList(list, value);
    expect(actual).toBe(expected);
  });
  describe("when element is the last element in the list", () => {
    it("returns the first element in the list", () => {
      const list = ["a", "b", "c"];
      const value = "c";
      const expected = "a";
      const actual = nextElementList(list, value);
      expect(actual).toBe(expected);
    });
  });
});