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

### Examples (components tests)

- 忽略fontawesome的icon，否則會跳warning，聚焦於原本測試的component: tests/components/TheSubnav.test.js (使用global.stubs)

## Mock functions

- https://www.udemy.com/course/vue-masterclass/learn/lecture/35049096#questions
