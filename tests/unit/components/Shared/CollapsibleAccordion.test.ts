import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

describe('CollapsibleAccordion', () => {
  const renderComponent = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          'font-awesome-icon': true
        },
      },
      props: {
        header: 'category'
      },
      slots: {
        default: `<h3>Hello World</h3>`
      },
      ...config
    })
  }
  
  it("renders child content", async () => {
    renderComponent()
    expect(screen.queryByText('Hello World')).not.toBeInTheDocument()
    const button = screen.getByRole('button', { name: /category/i })
    await userEvent.click(button)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  describe("when parent does not provide custom child content", () => {
    it("render default child content", async () => {
      renderComponent({
        props: {
          header: 'category'
        },
        slots: {}
      })
      const button = screen.getByRole('button', { name: /category/i })
      await userEvent.click(button)
      expect(screen.getByText('Whoops, somebody forgot to populate me!')).toBeInTheDocument()
    })
  })
})