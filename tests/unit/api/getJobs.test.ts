import axios from "axios";
import getJobs from "@/api/getJobs";
import type { Mock } from 'vitest'

vi.mock("axios")
const axiosGetMock = axios.get as Mock

beforeEach(() => {
  axiosGetMock.mockResolvedValue({
    data: [
      { id: 1, title: "Software Engineer" },
    ],
  })
});

describe("getJobs", () => {
  it("fetches jobs that candidates can apply to", async () => {
    await getJobs();
    expect(axiosGetMock).toHaveBeenCalledWith("http://testapi.com/jobs");
  });

  it("extract jobs from the response", async () => {
    const jobs = await getJobs();
    expect(jobs).toEqual([
      { id: 1, title: "Software Engineer" },
    ]);
  });
});