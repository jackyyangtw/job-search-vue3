import {render, screen} from '@testing-library/vue'
import TheSubnav from '@/components/Navigation/TheSubnav.vue'

describe('TheSubnav', () => {

  const renderComponent = (route) => {
    const $route = {
      name: route
    }
    render(TheSubnav, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        },
        mocks: {
          $route,
        }
      }
    })
  }
  

  it('when user is on jobs page, the subnav should be shown',() => {
    renderComponent('JobResults');
    expect(screen.getByText('1653')).toBeInTheDocument()
  })

  it('when user is not on jobs page, the subnav should not be shown',() => {
    renderComponent('Home');
    expect(screen.queryByText('1653')).not.toBeInTheDocument()
  })
})