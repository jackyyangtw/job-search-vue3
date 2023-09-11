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

  describe("INCLUDE_JOB_BY_ORGANIZATION",() => {
    describe("when no organization is selected",() => {
      const testByOrganization = (selectedOrgs = []) => {
        const userStores = useUserStore()
        userStores.selectedOrganizations = selectedOrgs
        const job = { organization: "ORG1" }
        const result = jobStores.INCLUDE_JOB_BY_ORGANIZATION(job)
        expect(result).toBe(true)
      }
      it("includes all jobs",() => {
        testByOrganization()
      })
      it("identifies jobs by the given organizations",() => {
        testByOrganization(["ORG1", "ORG2"])
      })
    })
  })

  describe("INCLUDE_JOB_BY_JOB_TYPE",() => {
    describe("when no job type is selected",() => {
      const testByJobType = (selectedJobTypes = []) => {
        const userStores = useUserStore()
        userStores.selectedJobTypes = selectedJobTypes
        const job = { jobType: "Full-time" }
        const result = jobStores.INCLUDE_JOB_BY_JOB_TYPE(job)
        expect(result).toBe(true)
      }
      it("includes all jobs",() => {
        testByJobType()
      })
      it("identifies jobs by the given job types",() => {
        testByJobType(["Full-time", "Temporary"])
      })
    })
  })
})