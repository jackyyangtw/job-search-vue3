import { computed } from 'vue'

export const usePrevAndNextPage = (currentPage, maxPage) => {
  const prevPage = computed(() => {
    const prevPage = currentPage.value - 1
    return prevPage >= 1 ? prevPage : undefined
  })
  const nextPage = computed(() => {
    const nextPage = currentPage.value + 1
    return nextPage <= maxPage.value ? nextPage : undefined
  })
  return {
    prevPage,
    nextPage
  }
}
