import { usePrevAndNextPage } from "@/composables/usePrevAndNextPage";
import { ref } from "vue";
describe("usePrevAndNextPage", () => {
  it("calc page before current page", () => {
    const currentPage = ref(2);
    const maxPage = ref(10);
    const { prevPage } = usePrevAndNextPage(currentPage, maxPage);
    expect(prevPage.value).toBe(1);
  })
  it("calc page after current page", () => {
    const currentPage = ref(2);
    const maxPage = ref(10);
    const { nextPage } = usePrevAndNextPage(currentPage, maxPage);
    expect(nextPage.value).toBe(3);
  });
  describe("when current page is 1", () => {
    it("does not provide prev page", () => {
      const currentPage = ref(1);
      const maxPage = ref(10);
      const { prevPage } = usePrevAndNextPage(currentPage, maxPage);
      expect(prevPage.value).toBeUndefined();
    });
  });
  describe("when current page is last page", () => {
    it("does not provide next page", () => {
      const currentPage = ref(10);
      const maxPage = ref(10);
      const { nextPage } = usePrevAndNextPage(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});