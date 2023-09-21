import { defineStore } from "pinia";
import { useUserStore } from "./user";
import type { Job } from "@/api/types";
import getJobs from "../api/getJobs";
// dynamic action & getters name
export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";
export const FILTERED_JOBS = "FILTERED_JOBS";
export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION";
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE";
export const INCLUDE_JOB_BY_DEGREE = "INCLUDE_JOB_BY_DEGREE";
export const INCLUDE_JOB_BY_SKILL = "INCLUDE_JOB_BY_SKILL";
export const FILTERED_JOBS_BY_ORGANIZATION = "FILTERED_JOBS_BY_ORGANIZATION";
export const INCLUDE_JOB_BY_LOCATION = "INCLUDE_JOB_BY_LOCATION";
export const ALL_JOBS = "ALL_JOBS";
export interface JobsState {
  jobs: Job[];
}

export const useJobsStore = defineStore("jobs", {
  state: (): JobsState => ({
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
    [ALL_JOBS](state) {
      return state.jobs;
    },
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOraganizations = new Set<string>();
      state.jobs.forEach((job) => {
        uniqueOraganizations.add(job.organization);
      });
      return uniqueOraganizations;
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set<string>();
      state.jobs.forEach((job) => {
        uniqueJobTypes.add(job.jobType);
      });
      return uniqueJobTypes;
    },
    [FILTERED_JOBS](state): Job[] {
      return state.jobs
        .filter((job) => this.INCLUDE_JOB_BY_ORGANIZATION(job))
        .filter((job) => this.INCLUDE_JOB_BY_JOB_TYPE(job))
        .filter((job) => this.INCLUDE_JOB_BY_DEGREE(job))
        .filter((job) => this.INCLUDE_JOB_BY_SKILL(job))
        .filter((job) => this.INCLUDE_JOB_BY_LOCATION(job));
    },
    [FILTERED_JOBS_BY_ORGANIZATION](state): Job[] {
      return state.jobs
        .filter((job) => this.INCLUDE_JOB_BY_ORGANIZATION(job))
    },
    [INCLUDE_JOB_BY_ORGANIZATION]: () => (job: Job) => {
      const userStore = useUserStore();
      if(userStore.selectedOrganizations.length === 0) {
        return true;
      }
      return userStore.selectedOrganizations.includes(job.organization)
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job: Job) => {
      const userStore = useUserStore();
      if(userStore.selectedJobTypes.length === 0) {
        return true;
      }
      return userStore.selectedJobTypes.includes(job.jobType)
    },
    [INCLUDE_JOB_BY_DEGREE]: () => (job: Job) => {
      const userStore = useUserStore();
      if(userStore.selectedDegrees.length === 0) {
        return true;
      }
      return userStore.selectedDegrees.includes(job.degree)
    },
    [INCLUDE_JOB_BY_SKILL]: () => (job: Job) => {
      const userStore = useUserStore();
      return job.title.toLowerCase().includes(userStore.skillSearchTerm.toLowerCase())
    },
    [INCLUDE_JOB_BY_LOCATION]: () => (job: Job) => {
      const userStore = useUserStore();
      const result = job.locations.some((location) => {
        return location.toLowerCase().includes(userStore.locationSearchTerm.toLowerCase())
      })
      // console.log(userStore.locationSearchTerm.toLowerCase())
      // console.log(result)
      return result
    },
  }
});