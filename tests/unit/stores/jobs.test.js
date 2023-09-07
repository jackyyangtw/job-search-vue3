import { createPinia,setActivePinia } from 'pinia'
import { useJobsStore } from '@/stores/jobs'
import axios from "axios";

vi.mock("axios")

describe("state",() => {

  let store;
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    store = useJobsStore()
  })

  it("store job listings",() => {
    expect(store.jobs).toEqual([])
  })
})

describe("actions",() => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  describe("FETCH_JOBS",() => {
    it("make API request and stores received jobs",async () => {
      axios.get.mockResolvedValue({
        data: [
          "JOB1", "JOB2"
        ],
      })
      const store = useJobsStore()
      await store.FETCH_JOBS()
      expect(store.jobs).toEqual(["JOB1", "JOB2"])
    })
  });

})