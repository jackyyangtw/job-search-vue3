import { render, screen } from '@testing-library/vue'
import { nextTick } from 'vue'
import TheHeadline from '@/components/JobSearch/TheHeadline.vue'

describe('TheHeadline', () => { 

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  
  it("display introductory action verb", () => {
    render(TheHeadline);
    const actionPhrase = screen.getByRole("heading", { name: /build for everyone/i });
    expect(actionPhrase).toBeInTheDocument();
  })

  it("changes action verb at a constant interval", () => {
    const setInterval = vi.fn();
    vi.stubGlobal("setInterval", setInterval);
    render(TheHeadline);
    expect(setInterval).toHaveBeenCalled();
  });

  it("change action verb after interval", async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();
    await nextTick(); // Wait for DOM to update
    const actionPhrase = screen.getByRole("heading", { name: /create for everyone/i });
    expect(actionPhrase).toBeInTheDocument();
  });

  it("remove interval when component is unmounted", () => {
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);
    const { unmount } = render(TheHeadline);
    unmount();
    expect(clearInterval).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

});