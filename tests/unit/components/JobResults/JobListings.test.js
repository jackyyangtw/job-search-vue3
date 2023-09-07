import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import JobListings from '@/components/JobResults/JobListings.vue'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'

const createRoute = (queryParams = {}) => ({
  query: {
    page: "5",
    ...queryParams
  }
})

const renderComponent = ($route) => {
  const pinia = createTestingPinia();
  render(JobListings, {
    global: {
      plugins: [pinia],
      stubs: {
        RouterLink: RouterLinkStub
      },
      mocks: {
        $route,
      }
    }
  })
} 


const GET_JOB_ACTION = () => {
  const jobsStore = useJobsStore();
  jobsStore.jobs = Array(15).fill({})
}

describe('JobListings', () => {
  it("fetch jobs from api", () => {
    const $route = createRoute();
    renderComponent($route);
    const jobsStore = useJobsStore();
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  it("creates max 10 jobs", async () => {
    const $route = createRoute({ page: "1" });
    renderComponent($route);

    GET_JOB_ACTION()

    // async => find, sync => get
    const jobListings = await screen.findAllByRole("listitem")
    expect(jobListings).toHaveLength(10)
  })

  describe("when params exclude page number",  () => {
    it("display page number 1", () => {
      const $route = createRoute({ page: undefined });

      renderComponent($route);
      expect(screen.getByText("Page 1")).toBeInTheDocument()
    })
  })

  describe("when params include page number", () => {
    it("display page number", () => {
      const $route = createRoute({ page: "5" });

      renderComponent($route);
      expect(screen.getByText("Page 5")).toBeInTheDocument()
    })
  })

  describe("when user in page 1", () => {
    it("does not show previous link", async () => {
      const $route = createRoute({ page: "1" });

      renderComponent($route);
      GET_JOB_ACTION()
      await screen.findAllByRole("listitem")
      const previousButton = screen.queryByRole("link", { name: /previous/i })
      expect(previousButton).not.toBeInTheDocument()
    })

    it("shows next link", async () => {
      const $route = createRoute({ page: "1" });

      renderComponent($route);
      GET_JOB_ACTION()
      await screen.findAllByRole("listitem")
      const nextButton = screen.queryByRole("link", { name: /next/i })
      expect(nextButton).toBeInTheDocument()
    })
  })

  describe("when user is on the last page",() => {
    it("does not show next link", async () => {
      const $route = createRoute({ page: "2" });
      renderComponent($route);
      GET_JOB_ACTION()
      await screen.findAllByRole("listitem")
      const nextLink = screen.queryByRole("link", { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })

    it("shows previous link", async () => {
      const $route = createRoute({ page: "2" });
      renderComponent($route);
      GET_JOB_ACTION()
      await screen.findAllByRole("listitem")
      const previousLink = screen.queryByRole("link", { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })

  })
})