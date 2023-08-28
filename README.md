## Testing

### Important Consepts

- testing the UI

### Pyramid

- unit test > integration test > e2e test

### TDD (Test Driven Development)

- https://www.udemy.com/course/vue-masterclass/learn/lecture/35041788#questions
- Red(fail) -> Green(pass) -> Refactor

### Coverage

- https://www.udemy.com/course/vue-masterclass/learn/lecture/35041792#questions
- 設定: package.json / "test:unit": "vitest --environment jsdom --coverage",
- 在終端機提示 - 如果你的測試覆蓋率不到 100%，請檢查你的程式碼是否有沒有被測試到的部分，或是有沒有被執行到的部分。
- 也可以在coverage/index.html看到覆蓋率

### setup vue test library

- https://www.udemy.com/course/vue-masterclass/learn/lecture/35041834#questions
- setup file: tests/setup.js
