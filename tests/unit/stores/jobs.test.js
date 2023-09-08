import { createPinia,setActivePinia } from 'pinia'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import axios from "axios";

vi.mock("axios")

let jobStores;
beforeEach(() => {
  const pinia = createPinia()
  setActivePinia(pinia)
  jobStores = useJobsStore()
})

describe("state",() => {
  it("store job listings",() => {
    expect(jobStores.jobs).toEqual([])
  })
})

describe("actions",() => {
  describe("FETCH_JOBS",() => {
    it("make API request and stores received jobs",async () => {
      axios.get.mockResolvedValue({
        data: [
          "JOB1", "JOB2"
        ],
      })
      await jobStores.FETCH_JOBS()
      expect(jobStores.jobs).toEqual(["JOB1", "JOB2"])
    })
  });

})

describe("getters",() => {
  describe("UNIQUE_ORGANIZATIONS",() => {
    it("returns unique organizations from the job list",() => {
      jobStores.jobs = [
        { organization: "ORG1" },
        { organization: "ORG2" },
        { organization: "ORG1" },
      ]
      expect(jobStores.UNIQUE_ORGANIZATIONS).toEqual(new Set(["ORG1", "ORG2"]))
    })
  })

  describe("FILTERED_JOBS_BY_ORGANIZATION",() => {
    it("identifies jobs by the given organizations",() => {
      jobStores.jobs = [
        { organization: "ORG1" },
        { organization: "ORG2" },
        { organization: "ORG3" },
      ]
      
      const userStores = useUserStore()
      userStores.selectedOrganizations = ["ORG1", "ORG2"]
      const result = jobStores.FILTERED_JOBS_BY_ORGANIZATION
      expect(result).toEqual([
        { organization: "ORG1" },
        { organization: "ORG2" },
      ])
    })
    describe("when no organization is selected",() => {
      it("returns all jobs",() => {
        jobStores.jobs = [
          { organization: "ORG1" },
          { organization: "ORG2" },
          { organization: "ORG3" },
        ]
        
        const userStores = useUserStore()
        userStores.selectedOrganizations = []
        const result = jobStores.FILTERED_JOBS_BY_ORGANIZATION
        expect(result).toEqual([
          { organization: "ORG1" },
          { organization: "ORG2" },
          { organization: "ORG3" },
        ])

      })
    })
  })

  describe("UNIQUE_JOB_TYPES",() => {
    it("returns unique job types from the job list",() => {
      jobStores.jobs = [
        { jobType: "Full-time" },
        { jobType: "Temporary" },
        { jobType: "Full-time" },
      ]
      expect(jobStores.UNIQUE_JOB_TYPES).toEqual(new Set(["Full-time", "Temporary"]))
    })
  })

  describe("FILTERED_JOBS_BY_JOB_TYPES",() => {
    it("identifies jobs by the given job types",() => {
      jobStores.jobs = [
        { jobType: "Full-time" },
        { jobType: "Temporary" },
        { jobType: "Part-time" },
      ]
      
      const userStores = useUserStore()
      userStores.selectedJobTypes = ["Full-time","Temporary"]
      const result = jobStores.FILTERED_JOBS_BY_JOB_TYPES
      expect(result).toEqual([
        { jobType: "Full-time" },
        { jobType: "Temporary" },
      ])
    })
    describe("when no job type is selected",() => {
      it("returns all jobs",() => {
        jobStores.jobs = [
          { jobType: "Full-time" },
          { jobType: "Temporary" },
          { jobType: "Part-time" },
        ]
        
        const userStores = useUserStore()
        userStores.selectedJobTypes = []
        const result = jobStores.FILTERED_JOBS_BY_JOB_TYPES
        expect(result).toEqual([
          { jobType: "Full-time" },
          { jobType: "Temporary" },
          { jobType: "Part-time" },
        ])

      })
    })
  })
})