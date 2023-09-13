import { createPinia, setActivePinia } from "pinia"
import { useUserStore } from '@/stores/user';

let userStore: ReturnType<typeof useUserStore>;
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
  it("store degrees that the user selected", () => {
    expect(userStore.selectedDegrees).toEqual([]);
  });
  it("stores users's search term for skills and qualifications", () => {
    expect(userStore.skillSearchTerm).toBe("");
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
  describe("ADD_SELECTED_DEGREE", () => {
    it("adds degrees that user selected to the list", () => {
      const selecedDegrees = ["bachelor", "master"];
      userStore.ADD_SELECTED_DEGREE(selecedDegrees);
      expect(userStore.selectedDegrees).toEqual(selecedDegrees);
    });
  })
  describe("CLEAR_USER_JOB_FILTER_SELECTIONS", () => {
    it("clears all user job filter selections", () => {
      userStore.ADD_SELECTED_ORGANIZATION(["org1", "org2"]);
      userStore.ADD_SELECTED_JOB_TYPE(["full-time", "part-time"]);
      userStore.ADD_SELECTED_DEGREE(["bachelor", "master"]);
      userStore.UPDATE_SKILL_SEARCH_TERM("test");
      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS();
      expect(userStore.selectedOrganizations).toEqual([]);
      expect(userStore.selectedJobTypes).toEqual([]);
      expect(userStore.selectedDegrees).toEqual([]);
      expect(userStore.skillSearchTerm).toBe("");
    });
  })
  describe("UPDATE_SKILL_SEARCH_TERM", () => {
    it("receive search term for skills the user has entered", () => {
      userStore.UPDATE_SKILL_SEARCH_TERM("test");
      expect(userStore.skillSearchTerm).toBe("test");
    });
  })
});