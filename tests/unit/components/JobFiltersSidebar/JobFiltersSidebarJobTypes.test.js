import {render, screen} from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue'

let jobsStore;
let userStore;
let sets;
const initStoresAndRenderComponent = () => {
  const pinia = createTestingPinia()
  jobsStore = useJobsStore()
  userStore = useUserStore()
  sets = ['Full-time', 'Part-time']
  jobsStore.UNIQUE_JOB_TYPES = new Set(sets)
  render(JobFiltersSidebarJobTypes, {
    global: {
      plugins: [pinia],
    },
    stubs: {
      FontAwesomeIcon: true
    }
  })
}

describe('JobFiltersSidebarJobTypes', () => {
  it("renders unique list of job types", async () => {
    initStoresAndRenderComponent();

    const button = screen.getByRole('button', { name: /job types/i })
    await userEvent.click(button)
    const jobTypesListItems = screen.queryAllByRole('listitem')
    const jobTypes = jobTypesListItems.map(org => org.textContent)
    expect(jobTypes).toEqual(sets)
  })

  it("使用者選擇工作類型後，會更新選擇的工作類型", async () => {
    initStoresAndRenderComponent();
    
    const button = screen.getByRole('button', { name: /job types/i })
    await userEvent.click(button)
    const selectedCheckbox = screen.getByRole('checkbox', { name: /Full-time/i })
    await userEvent.click(selectedCheckbox)
    expect(userStore.ADD_SELECTED_JOB_TYPE).toHaveBeenCalledWith(['Full-time'])
  })
})