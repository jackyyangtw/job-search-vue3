import {render, screen} from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'

let jobsStore;
let userStore;
let sets;
const initStoresAndRenderComponent = () => {
  const pinia = createTestingPinia()
  jobsStore = useJobsStore()
  userStore = useUserStore()
  sets = ['Organization 1', 'Organization 2']
  jobsStore.UNIQUE_ORGANIZATIONS = new Set(sets)
  render(JobFiltersSidebarOrganizations, {
    global: {
      plugins: [pinia],
    },
    stubs: {
      FontAwesomeIcon: true
    }
  })
}

describe('JobFiltersSidebarOrganizations component', () => {
  it("renders unique list of organizations", async () => {
    initStoresAndRenderComponent();

    const button = screen.getByRole('button', { name: /organization/i })
    await userEvent.click(button)
    const orgListItems = screen.queryAllByRole('listitem')
    const orgs = orgListItems.map(org => org.textContent)
    expect(orgs).toEqual(sets)
  })

  it("使用者選擇組織後，會更新選擇的組織", async () => {
    initStoresAndRenderComponent();
    
    const button = screen.getByRole('button', { name: /organization/i })
    await userEvent.click(button)
    const selectedCheckbox = screen.getByRole('checkbox', { name: /organization 1/i })
    await userEvent.click(selectedCheckbox)
    expect(userStore.ADD_SELECTED_ORGANIZATION).toHaveBeenCalledWith(['Organization 1'])
  })
})