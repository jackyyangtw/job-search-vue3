import axios from "axios";
import getDegrees from "@/api/getDegrees";
import type { Mock } from 'vitest'

vi.mock("axios")
const axiosGetMock = axios.get as Mock

beforeEach(() => {
  axiosGetMock.mockResolvedValue({
    data: [
      { id: 1, degree: "Master's" },
    ],
  })
});

describe("getDegrees", () => {
  it("fetches degrees that candidates can apply to", async () => {
    await getDegrees();
    expect(axiosGetMock).toHaveBeenCalledWith("http://testapi.com/degrees");
  });

  it("extract degrees from the response", async () => {
    const degrees = await getDegrees();
    expect(degrees).toEqual([
      { id: 1, degree: "Master's" },
    ]);
  });
});