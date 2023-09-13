import type { Mock } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import JobListings from '@/components/JobResults/JobListings.vue'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'
import { useRoute } from 'vue-router'
import { useDegreesStore } from '@/stores/degrees'

vi.mock('vue-router')
const useRouteMock = useRoute as Mock

let jobsStore: ReturnType<typeof useJobsStore>;
let degreesStore: ReturnType<typeof useDegreesStore>;
const renderComponent = (query = {}) => {
  useRouteMock.mockReturnValue({ query })
  const pinia = createTestingPinia();
  jobsStore = useJobsStore();
  degreesStore = useDegreesStore();
  render(JobListings, {
    global: {
      plugins: [pinia],
      stubs: {
        RouterLink: RouterLinkStub,
        FontAwesomeIcon: true,
      },
    }
  })
} 

// Mocking the pinia getter
const MOCK_JOBS_GETTER = () => {
  // @ts-expect-error
  jobsStore.FILTERED_JOBS = Array(15).fill({})
}

describe('JobListings', () => {
  it("fetch jobs from api", () => {
    renderComponent();
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })
  it("fetch degrees from api", () => {
    renderComponent();
    expect(degreesStore.FETCH_DEGREES).toHaveBeenCalled()
  })

  it("creates max 10 jobs", async () => {
    renderComponent({ page: "1" });

    MOCK_JOBS_GETTER()

    // async => find, sync => get
    const jobListings = await screen.findAllByRole("listitem")
    expect(jobListings).toHaveLength(10)
  })

  describe("when params exclude page number",  () => {
    it("display page number 1", () => {

      renderComponent();
      expect(screen.getByText("Page 1")).toBeInTheDocument()
    })
  })

  describe("when params include page number", () => {
    it("display page number", () => {

      renderComponent({ page: "5" });
      expect(screen.getByText("Page 5")).toBeInTheDocument()
    })
  })

  describe("when user in page 1", () => {
    it("does not show previous link", async () => {

      renderComponent();
      MOCK_JOBS_GETTER()
      await screen.findAllByRole("listitem")
      const previousButton = screen.queryByRole("link", { name: /previous/i })
      expect(previousButton).not.toBeInTheDocument()
    })

    it("shows next link", async () => {

      renderComponent({ page: "1" });
      MOCK_JOBS_GETTER()
      await screen.findAllByRole("listitem")
      const nextButton = screen.queryByRole("link", { name: /next/i })
      expect(nextButton).toBeInTheDocument()
    })
  })

  describe("when user is on the last page",() => {
    it("does not show next link", async () => {
      renderComponent({ page: "2" });
      MOCK_JOBS_GETTER()
      await screen.findAllByRole("listitem")
      const nextLink = screen.queryByRole("link", { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })

    it("shows previous link", async () => {
      renderComponent({ page: "2" });
      MOCK_JOBS_GETTER()
      await screen.findAllByRole("listitem")
      const previousLink = screen.queryByRole("link", { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })
  })
})