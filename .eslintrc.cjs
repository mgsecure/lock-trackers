module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended'

  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh','import'],
  rules: {
    'quotes': ['warn', 'single', {'avoidEscape': true}],
    'react/prop-types': 'off',
    'semi': ['warn', 'never'],
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/extensions': [
      'warn',
      'never',
      {
        jsx: 'never',
        json: 'always'
      }
    ],
    'import/no-unresolved': 'off',
    'import/namespace': 'off'
  },
}
