import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue"
import { useRouter } from 'vue-router'

vi.mock('vue-router')

let action
const createProps = (props = {}) => {
  action = vi.fn()
  return {
    header: "Some header",
    uniqueValues: new Set(['Full-time', 'Part-time']),
    action,
    ...props
  }
} 

let push;

const initAndRenderComponent = (props) => {
  const pinia = createTestingPinia()
  push = vi.fn();
  useRouter.mockReturnValue({ push })
  render(JobFiltersSidebarCheckboxGroup, {
    props: {
      ...props
    },
    global: {
      plugins: [pinia],
      stubs: {
        FontAwesomeIcon: true
      }
    },
  })
}

describe('JobFiltersSidebarCheckboxGroup', () => {
  it("renders unique list of job types", async () => {
    const props = createProps({
      header: "job Types",
      uniqueValues: new Set(['Full-time', 'Part-time'])
    })
    initAndRenderComponent(props);

    const button = screen.getByRole('button', { name: /job types/i })
    await userEvent.click(button)
    const jobTypesListItems = screen.queryAllByRole('listitem')
    const jobTypes = jobTypesListItems.map(org => org.textContent)
    expect(jobTypes).toEqual(['Full-time', 'Part-time'])
  })

  describe("當使用者點擊checkbox時", () => {

    it("會更新選擇的checkbox value", async () => {
      const props = createProps({
        header: "job Types",
        uniqueValues: new Set(['Full-time', 'Part-time']),
      })
      initAndRenderComponent(props)
      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)
      const selectedCheckbox = screen.getByRole('checkbox', { name: /Full-time/i })
      await userEvent.click(selectedCheckbox)
      expect(action).toHaveBeenCalledWith(['Full-time'])
    })

    it("navigate user to job results page to see fresh batch of filtered jobs", async () => {
      const props = createProps({
        header: "job Types",
        uniqueValues: new Set(['Full-time']),
      })
      initAndRenderComponent(props);
      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)
      const selectedCheckbox = screen.getByRole('checkbox', { name: /Full-time/i })
      await userEvent.click(selectedCheckbox)
      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })

})