// ✅
// https://www.prettier.cn/playground/
// https://prettier.io/docs/en/options
// https://juejin.cn/post/7225435922945343543
// https://juejin.cn/post/7138290108750528543

module.exports = {
  printWidth: 60, // 每行代码最大长度, 默认为80
  tabWidth: 2, // 一个tab代表几个空格数，
  useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  semi: true, // 声明后带分号
  singleQuote: true, // 使用单引号
  jsxSingleQuote: true, // jsx 使用单引号
  jsxBracketSameLine: true, // 启用jsx语法，> 放在末尾
  trailingComma: 'all', // 在多行逗号分隔的句法结构中尽可能打印尾随逗号
  arrowParens: 'always', // 箭头函数里，如果只有一个参数时，去掉括号
  bracketSpacing: true, // 对象、数组括号与文字间添加空格
  // endOfLine: 'lf' // 同 .editorconfig
  // singleAttributePerLine: true,
};
