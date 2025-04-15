import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
       rules: {
      'require-await': 'error',
      'no-param-reassign': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/no-danger': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/destructuring-assignment': 'off',
      'react/require-default-props': 'off',
      'react/no-array-index-key': 'off',
      'react-hooks/rules-of-hooks': 'warn',
      'consistent-return': 'off',
      'guard-for-in': 'off',
      'no-restricted-syntax': 'off',
      'react/jsx-key': 'warn',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/interactive-supports-focus': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
      radix: 'off',
      'import/no-named-as-default': 'off',
      'import/prefer-default-export': 'off',
      'linebreak-style': 'off',
      'import/no-cycle': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/default-param-last': 'off',
      '@typescript-eslint/naming-convention': 'warn',
    },
    },
  },
)
