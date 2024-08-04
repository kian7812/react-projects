
// ✅ 为了序列化 对象类型 val

const KEY_PREFIX = 'ANTD_ADMIN_DRIVER__'

export default {
  /**
   * 存储
   * @param key 名
   * @param val 值
   */
  set(key: string, val: any) {
    localStorage.setItem(KEY_PREFIX + key, JSON.stringify(val))
  },
  /**
   * 读取
   * @param key 名
   */
  get(key: string) {
    const val = localStorage.getItem(KEY_PREFIX + key)
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