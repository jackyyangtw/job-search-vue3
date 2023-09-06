import { render,screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import MainNav from "@/components/Navigation/MainNav.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("MainNav", () => {
  const renderComponent = () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
        mocks: {
          $route: {
            name:'Home'
          }
        }
      },
    });
  };

  it("display company name", () => {
    renderComponent();

    const companyName = screen.getByText("Bobo Career"); // synchronous code, get for one element
    expect(companyName).toBeInTheDocument();
  });

  it("display menu items for navigation", () => {
    renderComponent();

    // 如果找不到元素，會出錯，test case 會失敗
    const menuItems = screen.getAllByRole("listitem"); // get all elements with role="listitem" > li
    const menuItemsTexts = menuItems.map((item) => item.textContent); // get text content of each element
    expect(menuItemsTexts).toEqual(['Teams', 'Locations', 'Life at Bobo Corp', 'How we hire', 'Students','Jobs']); // compare the text content with expected value
  });

  describe("when the user logs in", () => {
    it("displays user profile picture", async () => {
      renderComponent();

      const queryOptions = {
        name: /user profile image/i, // 忽略大小寫
      };

      // 如果找不到元素，會返回 null，不會出錯，繼續test case
      let userProfilePicture = screen.queryByRole("img",queryOptions);
      expect(userProfilePicture).not.toBeInTheDocument();

      const userLoginButton = screen.getByRole("button",{
        name: /Sign in/i,
      });
      
      await userEvent.click(userLoginButton);

      userProfilePicture = screen.getByRole("img",queryOptions);
      expect(userProfilePicture).toBeInTheDocument();
    })
  });
});