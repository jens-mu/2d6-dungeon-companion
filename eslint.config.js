import js from '@eslint/js';
import ts from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier errors will show up as ESLint warnings
      'prettier/prettier': 'warn',

      // Vue specific rules
      'vue/multi-word-component-names': 'off', // Useful for small tools
      'vue/no-unused-vars': 'warn',

      // TS specific rules
      '@typescript-eslint/no-explicit-any': 'off', // Since we use 'any' for early prototyping
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  prettierConfig, // Must be last to override other rules
);
