import {render, screen} from '@testing-library/vue'
import HeaderContainer from '@/components/Shared/HeaderContainer.vue'

describe('HeaderContainer.vue', () => {
  it("allows parent to provide title content",() => {
    render(HeaderContainer, {
      slots: {
        title: "Test Title"
      }
    })
    expect(screen.getByText("Test Title")).toBeInTheDocument()
  })
  it("allows parent to provide subtitle content",() => {
    render(HeaderContainer, {
      slots: {
        subtitle: "Test Subtitle"
      }
    })
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument()
  })
})
