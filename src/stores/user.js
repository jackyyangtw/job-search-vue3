import { defineStore } from 'pinia';

export const ADD_SELECTED_ORGANIZATION = 'ADD_SELECTED_ORGANIZATION'
export const ADD_SELECTED_JOB_TYPE = 'ADD_SELECTED_JOB_TYPE'

export const useUserStore = defineStore('user',{
  state: () => ({
    isLoggedIn: false,
    selectedOrganizations: [],
    selectedJobTypes: []
  }),
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_ORGANIZATION](orgs) {
      this.selectedOrganizations = orgs;
    },
    [ADD_SELECTED_JOB_TYPE](jobTypes) {
      this.selectedJobTypes = jobTypes;
    }
  }
});