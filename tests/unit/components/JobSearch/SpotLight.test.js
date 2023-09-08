import {render,screen} from '@testing-library/vue'
import axios from 'axios'
import SpotLight from '@/components/JobSearch/SpotLight.vue'

vi.mock("axios")

describe("SpotLight.vue",()=>{

  const renderComponent = (dataKey,spotLight = {}) => {
    axios.get.mockResolvedValue({
      data:[
        {
          img: "image",
          title: "title",
          description: "description",
          ...spotLight
        }
      ],
    })
    render(SpotLight,{
      slots: {
        default: `
        <template #default="{ ${dataKey} }">
          <h1>{{ ${dataKey} }}</h1>
        </template>
        `
      }
    })
  }

  it("provide image to parent component",async ()=>{
    renderComponent("img")
    const text = await screen.findByText("image")
    expect(text).toBeInTheDocument()
  })

  it("provide title to parent component",async ()=>{
    renderComponent("title")
    const text = await screen.findByText("title")
    expect(text).toBeInTheDocument()
  });

  it("provide description to parent component",async ()=>{
    renderComponent("description")
    const text = await screen.findByText("description")
    expect(text).toBeInTheDocument()
  });
})