import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: true,
      },
    },
  },
)
// You might want to add other configs for React, React Hooks, Prettier etc. here
// For example, if you want your original React/React-Hooks configs back:
// {
//   files: ['**/*.{js,jsx,ts,tsx}'], // Apply to all relevant code files
//   plugins: {
//     'react-hooks': reactHooksPlugin, // Make sure to import these plugins
//     'react-refresh': reactRefreshPlugin,
//   },
//   rules: {
//     // Standard React rules (if not in extended configs)
//     'react/react-in-jsx-scope': 'off', // For React 17+ JSX transform
//     // React Hooks rules
//     'react-hooks/rules-of-hooks': 'error',
//     'react-hooks/exhaustive-deps': 'warn',
//     // React Refresh rules
//     'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
//   },
//   settings: {
//     react: {
//       version: 'detect',
//     },
//   },
// },
// Prettier integration (if you choose to use it)
// {
//   extends: ['eslint-config-prettier'], // or similar structure if using a plugin
// }
// )