import { render, screen } from '@testing-library/vue'
import JobFiltersSidebarPrompt from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue'
import userEvent from '@testing-library/user-event'
import { useUserStore } from '@/stores/user'
import { createTestingPinia } from '@pinia/testing'

describe('JobFiltersSidebarPrompt', () => {
  describe("when user click clear btn",() => {
    it('should clear all filters', async () => {
      const pinia = createTestingPinia()
      render(JobFiltersSidebarPrompt,{
        global: {
          plugins: [pinia]
        }
      })
      const clearBtn = screen.getByRole('button', { name: /clear Filters/i })
      await userEvent.click(clearBtn)
      const userStore = useUserStore()
      expect(userStore.CLEAR_USER_JOB_FILTER_SELECTIONS).toHaveBeenCalled()
    })
  })
})