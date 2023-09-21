import { defineStore } from 'pinia';
import { ref } from 'vue';
// export const ADD_SELECTED_ORGANIZATION = 'ADD_SELECTED_ORGANIZATION'
// export const ADD_SELECTED_JOB_TYPE = 'ADD_SELECTED_JOB_TYPE'
// export const ADD_SELECTED_DEGREE = 'ADD_SELECTED_DEGREE'
// export const CLEAR_USER_JOB_FILTER_SELECTIONS = 'CLEAR_USER_JOB_FILTER_SELECTIONS'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const selectedOrganizations = ref<string[]>([])
  const selectedJobTypes = ref<string[]>([])
  const selectedDegrees = ref<string[]>([])
  const skillSearchTerm = ref<string>("")
  const locationSearchTerm = ref<string>("")
  const login = () => {
    isLoggedIn.value = true
  }
  const ADD_SELECTED_ORGANIZATION = (orgs: string[]) => {
    selectedOrganizations.value = orgs
  }
  const ADD_SELECTED_JOB_TYPE = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes
  }
  const ADD_SELECTED_DEGREE = (degrees: string[]) => {
    selectedDegrees.value = degrees
  }
  const CLEAR_USER_JOB_FILTER_SELECTIONS = () => {
    selectedOrganizations.value = []
    selectedJobTypes.value = []
    selectedDegrees.value = []
    skillSearchTerm.value = ""
    locationSearchTerm.value = ""
  }
  const UPDATE_SKILL_SEARCH_TERM = (term: string) => {
    skillSearchTerm.value = term
  }
  const UPDATE_LOCATION_SEARCH_TERM = (term: string) => {
    locationSearchTerm.value = term
  }
  return {
    isLoggedIn,
    selectedOrganizations,
    selectedJobTypes,
    selectedDegrees,
    skillSearchTerm,
    locationSearchTerm,
    login,
    ADD_SELECTED_ORGANIZATION,
    ADD_SELECTED_JOB_TYPE,
    ADD_SELECTED_DEGREE,
    CLEAR_USER_JOB_FILTER_SELECTIONS,
    UPDATE_SKILL_SEARCH_TERM,
    UPDATE_LOCATION_SEARCH_TERM
  }
})

