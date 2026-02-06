import { defineConfig } from 'eslint/config';
import expoConfig from 'eslint-config-expo/flat';
import prettier from 'eslint-config-prettier';
import reactCompiler from 'eslint-plugin-react-compiler';

export default defineConfig([
  expoConfig,
  prettier,
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['dist/*', 'build/*', '.expo/*'],
    plugins: {
      'react-compiler': reactCompiler,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'react-compiler/react-compiler': 'error',
      'react/display-name': 'off',
      'sort-imports': [
        'error',
        { ignoreCase: true, ignoreDeclarationSort: true },
      ],
      'import/order': [
        'error',
        {
          groups: [
            ['external', 'builtin'],
            'internal',
            ['sibling', 'parent'],
            'index',
          ],
          pathGroups: [
            {
              pattern: '@(react|react-native)',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['internal', 'react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]);
