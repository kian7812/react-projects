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
// ✅不在.env文件里管理，在这里统一管理变量。
const config = {
  dev: {
    baseApi: '/local-api', // ✅本地连接项目后端服务
    cdn: 'http:xxx.aliyun.com',
    mock: true, // 开关✅
    mockApi: '/mock-local-api' // ✅本地mock拦截
    // mockApi: 'https://www.fastmock.site/xxx' // ✅远程mock
  },
  test: {
    baseApi: 'http:api-driver-dev.marsview.cc',
    cdn: 'http: xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/xxx'
  },
  prod: {
    baseApi: 'http:api-driver-dev.marsview.cc',
    cdn: 'http: xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/xxx'
  },
}

console.log('env:', {
  env,
  ...config[env]
});


export default {
  env,
  ...config[env]
}



