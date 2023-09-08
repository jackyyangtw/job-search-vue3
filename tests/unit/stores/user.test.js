import { createPinia, setActivePinia } from "pinia"
import { useUserStore } from '@/stores/user';

let userStore;
beforeEach(() => {
  setActivePinia(createPinia());
  userStore = useUserStore();
});

describe('state', () => {
  it("keep reack of if user is logged in", () => {
    expect(userStore.isLoggedIn).toBe(false);
  });
  it("stores organizations that user selected", () => {
    expect(userStore.selectedOrganizations).toEqual([]);
  })
  it("store job types that the user selected", () => {
    expect(userStore.selectedJobTypes).toEqual([]);
  })
});

describe('actions', () => {
  describe('login', () => {
    it("login the user", () => {
      userStore.login();
      expect(userStore.isLoggedIn).toBe(true);
    });
  });
  describe("ADD_SELECTED_ORGANIZATION", () => {
    it("adds orgs that user selected to the list", () => {
      const selecedOrgs = ["org1", "org2"];
      userStore.ADD_SELECTED_ORGANIZATION(selecedOrgs);
      expect(userStore.selectedOrganizations).toEqual(selecedOrgs);
    });
  });
  describe("ADD_SELECTED_JOB_TYPE", () => {
    it("adds job types that user selected to the list", () => {
      const selecedJobTypes = ["full-time", "part-time"];
      userStore.ADD_SELECTED_JOB_TYPE(selecedJobTypes);
      expect(userStore.selectedJobTypes).toEqual(selecedJobTypes);
    });
  });
});