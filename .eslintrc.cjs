/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    "plugin:vue/vue3-recommended",
    'eslint:recommended',
    "@vue/eslint-config-typescript",
    '@vue/eslint-config-prettier',
    "plugin:vitest-globals/recommended" // 讓 eslint 認得 vitest-globals
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    "vitest-globals/env": true // 讓 eslint 認得 vitest-globals
  }
}
