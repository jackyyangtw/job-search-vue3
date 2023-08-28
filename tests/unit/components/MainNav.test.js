import { render,screen } from "@testing-library/vue";
import MaunNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("display company name", () => {
    render(MaunNav);

    // log the DOM rendered by the testing library
    // screen.debug(); 

    const companyName = screen.getByText("Bobo Career"); // synchronous code, get for one element
    expect(companyName).toBeInTheDocument();

  });
});