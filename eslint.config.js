export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
        global: 'readonly',
        document: 'readonly',
        window: 'readonly',
        IntersectionObserver: 'readonly',
        matchMedia: 'readonly',
        requestAnimationFrame: 'readonly',
        performance: 'readonly',
        setTimeout: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      eqeqeq: 'error',
      'prefer-const': 'error',
    },
  },
];
