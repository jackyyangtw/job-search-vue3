import { cleanup } from "@testing-library/vue";
import  matchers  from "@testing-library/jest-dom/matchers";
import { expect,afterEach } from "vitest";

// Add custom jest matchers from jest-dom
expect.extend(matchers);

// Automatically cleanup Vue components between each test
afterEach(()=>{
    cleanup();
});