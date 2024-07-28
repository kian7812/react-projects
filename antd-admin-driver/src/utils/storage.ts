
// ✅ 为了序列化 对象类型 val

export default {
  /**
   * 存储
   * @param key 名
   * @param val 值
   */
  set(key: string, val: any) {
    localStorage.setItem(key, JSON.stringify(val))
  },
  /**
   * 读取
   * @param key 名
   */
  get(key: string) {
    const val = localStorage.getItem(key)
    if (!val) return ''

    try {
      return JSON.parse(val)
    } catch (error) {
      return val
    }
  },
  /**
   * 删除
   * @param key 名
   */
  remove(key: string) {
    localStorage.removeItem(key)
  },
  /**
   * 清理
   */
  clear() {
    localStorage.clear()
  }
}