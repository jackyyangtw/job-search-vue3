import {render,screen} from '@testing-library/vue'
import { useRouter } from 'vue-router';
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue'
import userEvent from '@testing-library/user-event'
import type {Mock} from 'vitest'

vi.mock("vue-router")
const useRouterMock = useRouter as Mock

describe('JobSearchForm', () => {
  describe('when user submits the form', () => {
    it('directs user to the search results page with user search parameters', async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push }); // mock the composition API router
      render(JobSearchForm,{
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        }
      });

      const searchTerms = {
        role: 'Vue Developer',
        location: 'London'
      }

      const roleInput = screen.getByRole('textbox',{
        name: /role/i
      });
      await userEvent.type(roleInput,searchTerms.role);

      const locationInput = screen.getByRole('textbox',{
        name: /where?/i
      });
      await userEvent.type(locationInput,searchTerms.location);

      const submitButton = screen.getByRole('button',{
        name: /search/i
      });
      await userEvent.click(submitButton);

      expect(push).toHaveBeenCalledWith({
        name: 'JobResults',
        query: {
          role: searchTerms.role,
          location: searchTerms.location
        }
      });
    })
  });
});