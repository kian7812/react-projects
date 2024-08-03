
// ✅ 接口类型定义
// ✅ 传入泛型默认 any 
export interface ResponseResult<T = any> {
  code: number
  data: T
  message: string
}