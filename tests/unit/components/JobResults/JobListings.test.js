import { render, screen } from '@testing-library/vue'
import axios from 'axios'
import { RouterLinkStub } from '@vue/test-utils'
import JobListings from '@/components/JobResults/JobListings.vue'

vi.mock("axios")

const createRoute = (queryParams = {}) => ({
  query: {
    page: "5",
    ...queryParams
  }
})

const renderComponent = ($route) => render(JobListings, {
  global: {
    stubs: {
      RouterLink: RouterLinkStub
    },
    mocks: {
      $route,
    }
  }
})

const getRequest = (getMoreData = true) => {
  const data = getMoreData ? Array(15).fill({}) : []
  axios.get.mockResolvedValue({ data });
}

describe('JobListings', () => {
  it("fetch jobs from api", () => {
    getRequest(false);
    const $route = createRoute();
    renderComponent($route);
    expect(axios.get).toHaveBeenCalledWith("http://testapi.com/jobs")
  })

  it("creates max 10 jobs", async () => {
    getRequest()
    const $route = createRoute({ page: "1" });
    renderComponent($route);

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
    it("does not show previous button", async () => {
      getRequest()
      const $route = createRoute({ page: "1" });

      renderComponent($route);
      await screen.findAllByRole("listitem")
      const previousButton = screen.queryByRole("link", { name: /previous/i })
      expect(previousButton).not.toBeInTheDocument()
    })

    it("shows next button", async () => {
      getRequest()
      const $route = createRoute({ page: "1" });

      renderComponent($route);
      await screen.findAllByRole("listitem")
      const nextButton = screen.queryByRole("link", { name: /next/i })
      screen.debug()
      expect(nextButton).toBeInTheDocument()
    })
  })

  describe("when user is on the last page",() => {
    it("does not show next link", async () => {
      getRequest()
      const $route = createRoute({ page: "2" });
      renderComponent($route);
      await screen.findAllByRole("listitem")
      const nextLink = screen.queryByRole("link", { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })

    it("shows previous link", async () => {
      getRequest()
      const $route = createRoute({ page: "2" });
      renderComponent($route);
      await screen.findAllByRole("listitem")
      const previousLink = screen.queryByRole("link", { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })

  })
})