import {render, screen} from '@testing-library/vue'
import TheSubnav from '@/components/TheSubnav.vue'

describe('TheSubnav', () => {

  const renderComponent = (isOnResultsPage) => {
    render(TheSubnav, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      data() {
        return {
          onJobResultsPage: isOnResultsPage
        }
      }
    })
  }
  
  it('when user is on jobs page, the subnav should be shown',() => {
    renderComponent(true);
    expect(screen.getByText('1653')).toBeInTheDocument()
  })

  it('when user is not on jobs page, the subnav should not be shown',() => {
    renderComponent(false);
    expect(screen.queryByText('1653')).not.toBeInTheDocument()
  })
})