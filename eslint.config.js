import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default [
  { ignores: ['dist', 'build', 'node_modules', 'api/node_modules'] },

  // Browser sources.
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs['recommended-latest'].rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      // Vite's React plugin injects the JSX runtime, so components never need
      // React in scope and the import is optional.
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // A leading underscore marks a parameter that is deliberately unused,
      // which is the usual way to keep a callback's arity intact.
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Plain quotes read fine in JSX text; only the characters that are
      // genuinely ambiguous next to JSX syntax are worth forbidding.
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],

      // Warnings rather than errors: both flag real things to clean up, but
      // they predate this config and shouldn't block `npm run lint` until
      // someone works through them.
      'react/prop-types': 'warn',
      'react-hooks/set-state-in-effect': 'warn',

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // Test files additionally run under Vitest's globals.
  {
    files: ['src/**/*.test.{js,jsx}', 'src/setupTests.js'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.vitest },
    },
  },

  // Vite and ESLint config files run in Node.
  {
    files: ['*.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: js.configs.recommended.rules,
  },

  // The Express backend is CommonJS on Node.
  {
    files: ['api/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node,
    },
    rules: js.configs.recommended.rules,
  },
];
