import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import JobFiltersSidebarSkill from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkill.vue'
import { useUserStore } from '@/stores/user'
import { createTestingPinia } from '@pinia/testing'

let userStore: ReturnType<typeof useUserStore>
const renderComponent = () => {
  const pinia = createTestingPinia()
  userStore = useUserStore()

  render(JobFiltersSidebarSkill, {
    global: {
      plugins: [pinia]
    }
  })
}

describe('JobFiltersSidebarSkill', () => {
  it("populates search input from store", async () =>{
    renderComponent()
    userStore.skillSearchTerm = "Programming"
    const input = await screen.findByRole<HTMLInputElement>('textbox')
    expect(input.value).toBe("Programming")
  })
  it("write user input to store", async () => {
    renderComponent()
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, "Programming")
    await userEvent.click(document.body)
    expect(userStore.UPDATE_SKILL_SEARCH_TERM).toHaveBeenCalledWith("Programming")
  })
  it("remove white spaces from user input", async () => {
    renderComponent()
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, "  Programming ")
    await userEvent.click(document.body)
    expect(userStore.UPDATE_SKILL_SEARCH_TERM).toHaveBeenCalledWith("Programming")
  })
})