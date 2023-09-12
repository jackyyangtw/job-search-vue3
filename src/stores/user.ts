import { defineStore } from 'pinia';

export const ADD_SELECTED_ORGANIZATION = 'ADD_SELECTED_ORGANIZATION'
export const ADD_SELECTED_JOB_TYPE = 'ADD_SELECTED_JOB_TYPE'

export interface UserState {
  isLoggedIn: boolean;
  selectedOrganizations: string[];
  selectedJobTypes: string[];
}

export const useUserStore = defineStore('user',{
  state: (): UserState => ({
    isLoggedIn: false,
    selectedOrganizations: [],
    selectedJobTypes: []
  }),
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_ORGANIZATION](orgs: string[]) {
      this.selectedOrganizations = orgs;
    },
    [ADD_SELECTED_JOB_TYPE](jobTypes: string[]) {
      this.selectedJobTypes = jobTypes;
    }
  }
});