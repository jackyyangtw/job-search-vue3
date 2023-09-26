import {render, screen} from '@testing-library/vue'
import JobListing from '@/components/JobResults/JobListing.vue'
import { RouterLinkStub } from '@vue/test-utils';
import { createJob } from '../../../utils/createJob';
import type { Job } from '@/api/types.js';
describe('JobListing', () => {
  const renderComponent = async (job: Job) => {

    render(JobListing, {
      props: {
        job: {
          ...job
        }
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
  }

  it("render job title", async ()=>{
    const props = createJob({
      title: "Senior Software Engineer",
    })
    renderComponent(props)
    const title = await screen.findByText(/Senior Software Engineer/i);
    expect(title).toBeInTheDocument();
  })
  
  it("render job organization",()=>{
    const props = createJob({
      organization: "Google",
    })
    renderComponent(props);
    expect(screen.getByText("Google")).toBeInTheDocument();
  })
});