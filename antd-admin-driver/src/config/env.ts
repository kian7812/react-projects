/**
 * ✅环境配置
 * 相比直接把配置信息写到.env文件，这种方式方便些配置信息
 */

type ENV = 'dev' | 'test' | 'prod'

// 环境变量
let env: ENV = 'dev'
if (import.meta.env.VITE_ENV === 'dev') {
  env = 'dev'
} else if (import.meta.env.VITE_ENV === 'test') {
  env = 'dev'
} else {
  env = 'prod'
}

// 配置信息
const config = {
  dev: {
    baseApi: '/api',
    uploadApi: 'http:api-driver-dev.marsview.cc',
    cdn: 'http: xxx.aliyun.com',
    mock: false,
    mockApi: 'https: www.fastmock.site/mock/xxxx/api'
  },
  test: {
    baseApi: '/api',
    uploadApi: 'http:api-driver-dev.marsview.cc',
    cdn: 'http: xxx.aliyun.com',
    mock: false,
    mockApi: 'https: www.fastmock.site/mock/xxxx/api'
  },
  prod: {
    baseApi: '/api',
    uploadApi: 'http:api-driver-dev.marsview.cc',
    cdn: 'http: xxx.aliyun.com',
    mock: false,
    mockApi: 'https: www.fastmock.site/mock/xxxx/api'
  },
}

export default {
  env,
  ...config[env]
}



