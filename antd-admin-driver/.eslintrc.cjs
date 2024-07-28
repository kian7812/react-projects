module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // 继承规则
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // ts
    'plugin:react-hooks/recommended' // react
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser', // 编译引擎
  plugins: ['react-refresh'],
  // "off" 或 0 - 关闭该规则
  // "warn" 或 1 - 启用并警告（不影响现有代码）
  // "error" 或 2 - 启用并报错（错误代码 1）
  rules: {
    //自定义规则
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-console': 'warn', // 禁止使用console
    'no-unused-vars': 'warn', // 禁止定义未使用变量
    'no-debugger': 'error', // 能否使用debugger
    'no-var': 'error' // 要求使用 let const 而不是var
  }
};
