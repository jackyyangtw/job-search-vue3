## Testing

### Important Consepts

- testing the UI

### Pyramid

- unit test > integration test > e2e test

### TDD (Test Driven Development)

- https://www.udemy.com/course/vue-masterclass/learn/lecture/35041788#questions
- Red(fail) -> Green(pass) -> Refactor
- 先寫測試 -> 寫程式碼 -> 重構

### Coverage

- https://www.udemy.com/course/vue-masterclass/learn/lecture/35041792#questions
- 設定: package.json / "test:unit": "vitest --environment jsdom --coverage",
- 在終端機提示 - 如果你的測試覆蓋率不到 100%，請檢查你的程式碼是否有沒有被測試到的部分，或是有沒有被執行到的部分。
- 也可以在coverage/index.html看到覆蓋率

### setup vue test library

- https://www.udemy.com/course/vue-masterclass/learn/lecture/35041834#questions
- setup file: tests/setup.js

### Testing methods

- toBe: 常用於比較兩個值"基本類型"是否完全相等(例如確認string的值)
- toEqual: 比較兩個值的"內容"是否相等(例如確認array的值)
- queryByRole: 用於找尋特定的DOM元素，例如: queryByRole('button')，找尋button元素，如果找不到會回傳null
- getByRole: 用於找尋特定的DOM元素，例如: getByRole('button')，找尋button元素，如果找不到會回傳error

### Mock functions

- https://www.udemy.com/course/vue-masterclass/learn/lecture/35049096#questions
- vi.fn: 用於模擬一個function，加速測試，例如: 模擬async function的回傳值
- vi.stubGlobal: 用於模擬一個global function，例如: 模擬setTimeout、setInterval、clearTimeout
- vi.useFakeTimers: 用於模擬setTimeout的時間，加速測試
- vi.useRealTimers: 用於取消模擬setTimeout的時間，恢復正常
- vi.advanceTimersToNextTimer: 用於模擬一條interval的時間通道

### Mock pinia

- mainNav.test.js
- 如果沒有mock pinia，或是active pinia，測試就會fail
- import createTestingPinia
- const pinia = createTestingPinia({ stubActions: false });

### BeforeEach、AfterEach

- 在每個測試開始前，或是結束後，執行一些動作
- 例如: 開始測試時使用fakeTimers，結束測試時使用realTimers

### Components

- RouterLinkStub: 用於模擬router-link，例如: 模擬點擊router-link

### Examples (components tests)

- stub & mock
  1. component: tests/unit/components/Navigation/TheSubnav.test.js
  1. 忽略fontawesome的icon(global.stubs)，否則會跳warning
  1. mock $route(global.mocks)，簡化實際上的$route
- testing axios
  1. component: tests/unit/components/JobResults/JobListings.test.js
  1. mock axios，簡化實際上的axios: vi.mock("axios")
  1. mock geting resolve value: axios.get.mockResolvedValue({ data: [] });
  1. findAllByRole VS getByRole: findAllByRole: async return promise, getByRole: sync

### Composition API

- mock composition api router
  1. component: JobSearchForm.test.js

### Typescript and Testing

## Javascript Tips

- 防止寫錯action名稱
  1.  stores/jobs.js
  1.  export const FETCH_JOBS = "FETCH_JOBS";
  1.  async [FETCH_JOBS]() {
      const jobs = await getJobs();
      this.jobs = jobs;
      },

## Typescript

### Generics

- example:

```
const copyArray = <T>(array: T[]): T[] => [...array]
copyArray<number>([3,5])
copyArray<boolean>([true,false])

```

- example: nextElementList.ts

### Partial

- Partial 的功能是將傳入的物件的所有屬性變成 optional
- 用於測試很方便，因為不用寫很多屬性
- ex: jobs.test.ts

### as

- axios

1. getJobs.ts
1. mock axios.get: const axiosGetMock = axios.get as Mock

## Typescript and Vue

## Deploy to gh-pages

1. git add dist -f
2. git commit -m "adding dist"
3. git subtree push --prefix dist origin gh-pages
