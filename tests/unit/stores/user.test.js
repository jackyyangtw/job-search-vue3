import { createPinia, setActivePinia } from "pinia"
import { useUserStore } from '@/stores/user';

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('state', () => {
  it("keep reack of if user is logged in", () => {
    const userStore = useUserStore();
    expect(userStore.isLoggedIn).toBe(false);
  });
});

describe('actions', () => {
  describe('login', () => {
    it("login the user", () => {
      const userStore = useUserStore();
      userStore.login();
      expect(userStore.isLoggedIn).toBe(true);
    });
  });
});