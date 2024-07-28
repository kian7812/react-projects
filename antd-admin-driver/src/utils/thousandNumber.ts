
/**
 * 推荐✅使用toLocaleString本地化处理数值
 * Number.prototype.toLocaleString()
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 */

export function formatLocaleAmount(val: string | number) {
  if (val === '' || val === undefined || val === null) return ''

  let num = parseFloat(val.toString())

  return num.toLocaleString()
}

/**
 * 正则千分位
 * 正则表达式中 ?= 和 ?: 和 ? !的理解 https://blog.csdn.net/csm0912/article/details/81206848
 * 千位分割符的理解 https://blog.csdn.net/csm0912/article/details/90260296
 */

export function formatThousandNumber(val: string | number) {
  if (val === '' || val === undefined || val === null) return ''

  let num = val.toString()

  if (num.indexOf('.')) return num.replace(/(\d)(?=((\d{3})+\.))/g, '$1,')
  return num.replace(/(\d)(?=((\d{3})+$))/g, '$1,')
}

