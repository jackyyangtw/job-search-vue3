import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import type { Job } from "@/api/types";
import getJobs from "../api/getJobs";

export interface JobsState {
  jobs: Job[];
}
export const useJobsStore = defineStore("jobs", () => {
  const jobs = ref<Job[]>([]);
  const userStore = useUserStore();
  const FETCH_JOBS = async () => {
    jobs.value = await getJobs();
  };
  const ALL_JOBS = computed(() => {
    return jobs.value;
  });
  const UNIQUE_LOCATIONS = computed(() => {
    const uniqueLocations = new Set<string>();
    jobs.value.forEach((job) => {
      job.locations.forEach((location) => {
        uniqueLocations.add(location);
      });
    });
    return uniqueLocations;
  });
  const UNIQUE_ORGANIZATIONS = computed(() => {
    const uniqueOraganizations = new Set<string>();
    jobs.value.forEach((job) => {
      uniqueOraganizations.add(job.organization);
    });
    return uniqueOraganizations;
  });
  const UNIQUE_JOB_TYPES = computed(() => {
    const uniqueJobTypes = new Set<string>();
    jobs.value.forEach((job) => {
      uniqueJobTypes.add(job.jobType);
    });
    return uniqueJobTypes;
  });
  const FILTERED_JOBS = computed(() => {
    return jobs.value
      .filter((job) => INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter((job) => INCLUDE_JOB_BY_JOB_TYPE(job))
      .filter((job) => INCLUDE_JOB_BY_DEGREE(job))
      .filter((job) => INCLUDE_JOB_BY_SKILL(job))
      .filter((job) => INCLUDE_JOB_BY_LOCATION(job));
  });
  const FILTERED_JOBS_BY_ORGANIZATION = computed(() => {
    return jobs.value
      .filter((job) => INCLUDE_JOB_BY_ORGANIZATION(job))
  });
  const INCLUDE_JOB_BY_ORGANIZATION = (job: Job) => {
    if(userStore.selectedOrganizations.length === 0) {
      return true;
    }
    return userStore.selectedOrganizations.includes(job.organization)
  }
  const INCLUDE_JOB_BY_JOB_TYPE = (job: Job) => {
    if(userStore.selectedJobTypes.length === 0) {
      return true;
    }
    return userStore.selectedJobTypes.includes(job.jobType)
  }
  const INCLUDE_JOB_BY_DEGREE = (job: Job) => {
    if(userStore.selectedDegrees.length === 0) {
      return true;
    }
    return userStore.selectedDegrees.includes(job.degree)
  }

  const INCLUDE_JOB_BY_SKILL = (job: Job) => {
    const skillSearchTerm = userStore.skillSearchTerm.split(" ");
    if(skillSearchTerm.includes("java")) {
      return skillSearchTerm.some((skill) => {
        return job.title.toLowerCase().includes(skill.toLowerCase()) && !job.title.toLowerCase().includes("javascript")
      })
    }
    return skillSearchTerm.some((skill) => {
      return job.title.toLowerCase().includes(skill.toLowerCase())
    })
  }

  const INCLUDE_JOB_BY_LOCATION = (job: Job) => {
    const result = job.locations.some((location) => {
      return location.toLowerCase().includes(userStore.locationSearchTerm.toLowerCase())
    })
    return result
  }

  return {
    jobs,
    ALL_JOBS,
    UNIQUE_ORGANIZATIONS,
    UNIQUE_JOB_TYPES,
    FILTERED_JOBS,
    FILTERED_JOBS_BY_ORGANIZATION,
    UNIQUE_LOCATIONS,
    FETCH_JOBS,
    INCLUDE_JOB_BY_ORGANIZATION,
    INCLUDE_JOB_BY_JOB_TYPE,
    INCLUDE_JOB_BY_DEGREE,
    INCLUDE_JOB_BY_SKILL,
    INCLUDE_JOB_BY_LOCATION,
  };
});