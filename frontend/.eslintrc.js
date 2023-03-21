module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:testing-library/react',
  ],

  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'testing-library', 'prettier'],
  rules: {
    'no-console': 'warn',
    'prettier/prettier': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.tsx', '**/*.test.ts'],
      plugins: ['vitest'],
      rules: {
        'vitest/consistent-test-it': ['warn', { fn: 'it' }],
        'vitest/expect-expect': 'off',
        'vitest/max-nested-describe': ['warn', { max: 3 }],
        'vitest/no-conditional-tests': 'error',
        'vitest/no-focused-tests': 'warn',
        'vitest/no-identical-title': 'error',
        'vitest/no-skipped-tests': 'warn',
      },
    },
  ],
};
