import env from "@/config/env";
import axios, { AxiosError } from "axios";
import { ResponseResult } from '@/types/modules/common';
import storage from "./storage";
import { message } from '@/components/AntdGlobal'
import downloadFile from "./download";

// 创建实例
const instance = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  timeout: 8000,
  headers: {
    'X-Custom-Header': 'foobar',
    iCode: '' // 防盗码
  },
  withCredentials: true, // 跨域
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = storage.get('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token // jwt 固定格式
  }

  if (env.mock) {
    config.baseURL = env.mockApi
  } else {
    config.baseURL = env.baseApi
  }

  return {
    ...config
  };
}, function (error: AxiosError) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  // ✅返回Blob二进制流，直接返回
  if (response.config.responseType === 'blob') {
    return response
  }

  // console.log(123, response);
  // axios 的 response，包括的 result 是服务端返回数据
  const result: ResponseResult = response.data

  // code 0 正确
  // code 50001 token失效
  // code 其它非0 错误

  if (result.code === 500001) {
    message.error(result.message)
    storage.remove('token')
    location.href = '/login?callback=' + encodeURIComponent(location.href)
  } else if (result.code !== 0) {
    if (response.config.showError === false) {
      return Promise.resolve(result) // 注意是 resolve
    } else {
      message.error(result.message)
      return Promise.reject(result)
    }

  }

  // 返回data
  return result.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  message.error(error.message)
  return Promise.reject(error);
});

// ✅定义AxiosRequestConfig类型扩展，新增 showLoading  showError
interface IConfig {
  showLoading?: boolean //✅ 这个是教程里的全局Loading，我这块没有全局Loading，后续有全局Loading就可以使用这个变量了
  showError?: boolean
}

// 配置 options
export default {
  //✅返回类型：传入T，返回Promise<T> 
  get<T>(url: string, params?: any, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.get(url, { params, ...options },)
  },
  post<T>(url: string, params?: any, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
    return instance.post(url, params, options)
  },
  // ✅下载文件，返回Blob对象 二进制流
  downloadFile(url: string, data: any, fileName = 'FileName.xlsx') {
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob'
    }).then((response) => {
      downloadFile(response)
    })
  }
}