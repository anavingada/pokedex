/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'max-len': ['error', { code: 100, ignoreStrings: true, ignoreTemplateLiterals: true }],
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 3 },
        multiline: { max: 1 }
      }
    ],
    'vue/html-indent': ['error', 2]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // Allow script setup in Vue SFCs
        'max-len': 'off'
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }
    }
  ]
}
