import {render, screen} from '@testing-library/vue'
import JobListing from '@/components/JobResults/JobListing.vue'
import { RouterLinkStub } from '@vue/test-utils';

describe('JobListing', () => {
  const renderComponent = (props) => render(JobListing, {
    props,
    global: {
      stubs: {
        RouterLink: RouterLinkStub
      }
    }
  });

  it("render job title",()=>{
    renderComponent({
      job: {
        title: "Senior Software Engineer",
      }
    })
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
  })
  
  it("render job organization",()=>{
    renderComponent({
      job: {
        organization: "Google",
      }
    });
    expect(screen.getByText("Google")).toBeInTheDocument();
  })
});