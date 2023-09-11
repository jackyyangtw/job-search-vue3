import { render, screen } from '@testing-library/vue'
import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'
import { useRoute } from 'vue-router'

vi.mock('vue-router')

let jobsStore;
const renderComponent = (route) => {
  const pinia = createTestingPinia()
  jobsStore = useJobsStore()
  useRoute.mockReturnValue({ name: route })
  render(TheSubnav, {
    global: {
      plugins: [pinia],
      stubs: {
        FontAwesomeIcon: true
      }
    }
  })
}

describe('TheSubnav', () => {
  describe('when user is on jobs page',() => {
    it("displays the number of jobs", async () => {
      renderComponent('JobResults');
      const unmbersOfJobs = 16
      jobsStore.FILTERED_JOBS = Array(unmbersOfJobs).fill({})
      const jobCount = await screen.findByText(unmbersOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user is not on jobs page', () => {
    it('not displays the number of jobs', () => {
      renderComponent('Home');
      const unmbersOfJobs = 16
      jobsStore.FILTERED_JOBS = Array(unmbersOfJobs).fill({})
      const jobCount = screen.queryByText(unmbersOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})