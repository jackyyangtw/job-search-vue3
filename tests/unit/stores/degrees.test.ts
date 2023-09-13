import { createPinia,setActivePinia } from "pinia";
import { useDegreesStore } from "@/stores/degrees";
import axios from "axios";
import type { Mock } from "vitest";
import { createDegree } from "../../utils/createDegree"
vi.mock("axios")
const axiosGetMock = axios.get as Mock


let degreeStore: ReturnType<typeof useDegreesStore>
beforeEach(() => {
  const pinia = createPinia()
  setActivePinia(pinia)
  degreeStore = useDegreesStore()
})

describe("state", () => {
  it("store all degrees that jobs may require", () => {
    expect(degreeStore.degrees).toEqual([])
  })
})

describe("actions", () => {
  describe("FETCH_DEGREES", () => {
    it("make API request and stores received degrees", async () => {
      axiosGetMock.mockResolvedValue({
        data: [{
            id: 1,
            degree: "Degree1",
          }],
      })
      await degreeStore.FETCH_DEGREES()
      expect(degreeStore.degrees).toEqual([{
        id: 1,
        degree: "Degree1",
      }])
    })
  })
})

describe("getters", () => {
  describe("UNIQUE_DEGREES", () => {
    it("returns unique degrees from the degree list", () => {
      degreeStore.degrees = [
        createDegree({ degree: "Degree1" }),
        createDegree({ degree: "Degree2" }),
        createDegree({ degree: "Degree1" }),
      ]
      expect(degreeStore.UNIQUE_DEGREES).toEqual(new Set(["Degree1", "Degree2"]))
    })
  })
})