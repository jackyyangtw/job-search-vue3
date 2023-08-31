import {render, screen} from '@testing-library/vue'
import TheHeadline from '@/components/TheHeadline.vue'
import { vi } from 'vitest'

describe('TheHeadline', () => { 
  it("display introductory action verb", () => {
    vi.useFakeTimers();
    render(TheHeadline);
    const actionPhrase = screen.getByRole("heading", { name: /build for everyone/i });
    expect(actionPhrase).toBeInTheDocument();
    vi.useRealTimers();
  })

  it("changes action verb at a constant interval", () => {
    vi.useFakeTimers();
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);
    render(TheHeadline);
    expect(mock).toHaveBeenCalled();
    vi.useRealTimers();
  });
});