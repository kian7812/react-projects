
// ✅ 接口类型定义
// ✅ 传入泛型默认 any 
export interface ResponseResult<T = any> {
  code: number
  data: T
  message: string
}

// ✅ 接口返回具体内容类型
export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

// ✅ 分页
export interface PageParams {
  pageNum: number
  pageSize?: number
}