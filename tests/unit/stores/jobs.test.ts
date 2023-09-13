import { createPinia,setActivePinia } from 'pinia'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import type { Mock } from 'vitest'
import type { Job } from '@/api/types'
import axios from "axios";

vi.mock("axios")
const axiosGetMock = axios.get as Mock

let jobStores: ReturnType<typeof useJobsStore>
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
      axiosGetMock.mockResolvedValue({
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
      ] as Job[]
      expect(jobStores.UNIQUE_ORGANIZATIONS).toEqual(new Set(["ORG1", "ORG2"]))
    })
  })

  describe("UNIQUE_JOB_TYPES",() => {
    it("returns unique job types from the job list",() => {
      jobStores.jobs = [
        { jobType: "Full-time" },
        { jobType: "Temporary" },
        { jobType: "Full-time" },
      ] as Job[]
      expect(jobStores.UNIQUE_JOB_TYPES).toEqual(new Set(["Full-time", "Temporary"]))
    })
  })

  describe("INCLUDE_JOB_BY_ORGANIZATION",() => {
    describe("when no organization is selected",() => {
      const testByOrganization = (selectedOrgs: string[] = []) => {
        const userStores = useUserStore()
        userStores.selectedOrganizations = selectedOrgs
        const job = { organization: "ORG1" } as Job
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
    const testByJobType = (selectedJobTypes: string[] = []) => {
      const userStores = useUserStore()
      userStores.selectedJobTypes = selectedJobTypes
      const job = { jobType: "Full-time" } as Job
      const result = jobStores.INCLUDE_JOB_BY_JOB_TYPE(job)
      expect(result).toBe(true)
    }
    describe("when no job type is selected",() => {
      it("includes all jobs",() => {
        testByJobType()
      })
    })
    it("identifies jobs by the given job types",() => {
      testByJobType(["Full-time", "Temporary"])
    })
  })

  describe("INCLUDE_JOB_BY_DEGREE",() => {
    const testByDegree = (selectedDegrees: string[] = []) => {
      const userStores = useUserStore()
      userStores.selectedDegrees = selectedDegrees
      const job = { degree: "Bachelor" } as Job
      const result = jobStores.INCLUDE_JOB_BY_DEGREE(job)
      expect(result).toBe(true)
    }
    describe("when no degree is selected",() => {
      it("includes all jobs",() => {
        testByDegree()
      })
    })
    it("identifies jobs by the given degrees",() => {
      testByDegree(["Bachelor"])
    })
  })

  describe("INCLUDE_JOB_BY_SKILL",() => {
    it("includes jobs that match the given skill search terms",() => {
      const userStores = useUserStore()
      userStores.skillSearchTerm = "Vue"
      const job = { title: "Vue developer" } as Job
      const result = jobStores.INCLUDE_JOB_BY_SKILL(job)
      expect(result).toBe(true)
    })

    it("handles inconsistent casing",() => {
      const userStores = useUserStore()
      userStores.skillSearchTerm = "react"
      const job = { title: "React developer" } as Job
      const result = jobStores.INCLUDE_JOB_BY_SKILL(job)
      expect(result).toBe(true)
    })

    describe("when no skill search term is given",() => {
      it("includes all jobs",() => {
        const userStores = useUserStore()
        userStores.skillSearchTerm = ""
        const job = { title: "React developer" } as Job
        const result = jobStores.INCLUDE_JOB_BY_SKILL(job)
        expect(result).toBe(true)
      })
    })
  })
})