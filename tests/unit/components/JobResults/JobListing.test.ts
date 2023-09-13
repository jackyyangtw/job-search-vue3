import {render, screen} from '@testing-library/vue'
import JobListing from '@/components/JobResults/JobListing.vue'
import { RouterLinkStub } from '@vue/test-utils';
import { createJob } from '../../../utils/createJob';
import type { Job } from '@/api/types';

describe('JobListing', () => {
  const renderComponent = (job: Job) => render(JobListing, {
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

  it("render job title",()=>{
    const props = createJob({
      title: "Senior Software Engineer",
    })
    renderComponent(props)
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
  })
  
  it("render job organization",()=>{
    const props = createJob({
      organization: "Google",
    })
    renderComponent(props);
    expect(screen.getByText("Google")).toBeInTheDocument();
  })
});