import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue"
import { useRouter } from 'vue-router'
import type { Mock } from 'vitest'
import { useUserStore } from '@/stores/user'
vi.mock('vue-router')
const useRouterMock = useRouter as Mock

interface JobFiltersSidebarCheckboxGroupProps {
  uniqueValues: Set<string>;
  action: Mock;
}

let action: Mock
const createProps = (props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}): JobFiltersSidebarCheckboxGroupProps => {
  action = vi.fn()
  
  return {
    uniqueValues: new Set(['Full-time', 'Part-time']),
    action,
    ...props
  }
} 

let push: Mock
let userStore: ReturnType<typeof useUserStore>
const initAndRenderComponent = (props: JobFiltersSidebarCheckboxGroupProps) => {
  const pinia = createTestingPinia({stubActions: false})
  push = vi.fn();
  userStore = useUserStore()
  useRouterMock.mockReturnValue({ push })
  render(JobFiltersSidebarCheckboxGroup, {
    props: {
      ...props
    },
    global: {
      plugins: [pinia]
    },
  })
}

describe('JobFiltersSidebarCheckboxGroup', () => {
  it("renders unique list of job types", async () => {
    const props = createProps({
      uniqueValues: new Set(['Full-time', 'Part-time'])
    })
    initAndRenderComponent(props);
    const jobTypesListItems = screen.queryAllByRole('listitem')
    const jobTypes = jobTypesListItems.map(org => org.textContent)
    expect(jobTypes).toEqual(['Full-time', 'Part-time'])
  })

  describe("當使用者點擊checkbox時", () => {

    it("會更新選擇的checkbox value", async () => {
      const props = createProps({
        uniqueValues: new Set(['Full-time', 'Part-time']),
      })
      initAndRenderComponent(props)
      const selectedCheckbox = screen.getByRole('checkbox', { name: /Full-time/i })
      await userEvent.click(selectedCheckbox)
      expect(action).toHaveBeenCalledWith(['Full-time'])
    })

    it("navigate user to job results page to see fresh batch of filtered jobs", async () => {
      const props = createProps({

        uniqueValues: new Set(['Full-time']),
      })
      initAndRenderComponent(props);
      const selectedCheckbox = screen.getByRole('checkbox', { name: /Full-time/i })
      await userEvent.click(selectedCheckbox)
      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })

  })

  describe("when user clear all checkboxs", () => {
    it("unchecks all checkboxes", async () => {
      const props = createProps({
        uniqueValues: new Set(['Full-time', 'Part-time']),
      })
      initAndRenderComponent(props);

      const selectedCheckbox = screen.getByRole<HTMLInputElement>('checkbox', { name: /Full-time/i })
      await userEvent.click(selectedCheckbox)
      expect(selectedCheckbox.checked).toBe(true)
      
      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS()
      const selectedCheckboxAfterClear = await screen.findByRole<HTMLInputElement>('checkbox', { name: /Full-time/i })
      expect(selectedCheckboxAfterClear.checked).toBe(false)
    })
  })

})