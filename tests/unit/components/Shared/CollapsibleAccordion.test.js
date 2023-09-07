import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

describe('CollapsibleAccordion', () => {
  it("renders child content", async () => {
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
      }
    })
    expect(screen.queryByText('Hello World')).not.toBeInTheDocument()
    const button = screen.getByRole('button', { name: /category/i })
    await userEvent.click(button)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})