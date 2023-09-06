import { render, screen } from '@testing-library/vue'
import ActionButton from '@/components/Shared/ActionButton.vue'

describe('ActionButton', () => {

  const renderComponent = (props) => render(ActionButton, { props })

  it("render text",()=> {
    renderComponent({
      text: "Click me",
      type: "primary"
    })
    const button = screen.getByRole('button',{
      name: /Click me/i
    })
    expect(button).toBeInTheDocument()
  })

  it("applies one of serveral styles to the button",()=> {
      renderComponent({
        text: "Click me",
        type: "primary"
      })
      const button = screen.getByRole('button',{
        name: /Click me/i
      })
      expect(button).toHaveClass("primary")
  })
  
})