
/**
 * ✅使用 toLocaleDateString 本地化时间处理
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 */

export function formatLocaleDate(date?: Date, rule?: string) {
  let curDate = new Date()
  if (date) {
    curDate = date
  }
  if (rule === 'yyyy-MM-dd') return curDate.toLocaleDateString()
  if (rule === 'HH-mm-ss') return curDate.toLocaleTimeString()

  return curDate.toLocaleTimeString()
}

// ✅正则方式格式化日期

type RegObjType = {
  [key: string]: number
}

export function formatDate(date?: Date, rule?: string) {
  let curDate = new Date()
  if (date) {
    curDate = date
  }

  // format time
  let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())

  // 正则 对应的 替换值
  const regObj: RegObjType = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds(),
  }

  for (const k in regObj) {
    fmt = fmt.replace(
      new RegExp(k),
      // 3 => 03
      regObj[k] > 9 ? regObj[k].toString() : '0' + regObj[k].toString()
    )
  }

  return fmt
}