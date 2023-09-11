import { defineStore } from "pinia";
import { useUserStore } from "./user";
import getJobs from "../api/getJobs";

// dynamic action & getters name
export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";
export const FILTERED_JOBS = "FILTERED_JOBS";
export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION";
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE";

export const useJobsStore = defineStore("jobs", {
  state: () => ({
    jobs: [],
  }),
  actions: {
    // dynamic action name
    async [FETCH_JOBS]() {
      const jobs = await getJobs();
      this.jobs = jobs;
    },
  },
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOraganizations = new Set();
      state.jobs.forEach((job) => {
        uniqueOraganizations.add(job.organization);
      });
      return uniqueOraganizations;
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set();
      state.jobs.forEach((job) => {
        uniqueJobTypes.add(job.jobType);
      });
      return uniqueJobTypes;
    },
    [FILTERED_JOBS](state) {
      return state.jobs
        .filter((job) => this.INCLUDE_JOB_BY_ORGANIZATION(job))
        .filter((job) => this.INCLUDE_JOB_BY_JOB_TYPE(job));
    },
    [INCLUDE_JOB_BY_ORGANIZATION]: () => (job) => {
      const userStore = useUserStore();
      if(userStore.selectedOrganizations.length === 0) {
        return true;
      }
      return userStore.selectedOrganizations.includes(job.organization)
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job) => {
      const userStore = useUserStore();
      if(userStore.selectedJobTypes.length === 0) {
        return true;
      }
      return userStore.selectedJobTypes.includes(job.jobType)
    },
  }
});