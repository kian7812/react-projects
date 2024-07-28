import { message } from "antd";
import axios, { AxiosError } from "axios";

// 创建实例
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 8000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true, // 跨域
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Token::' + token
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
  const data = response.data

  if (data.code === 500001) {
    message.error(data.msg)
    localStorage.removeItem('token')
    // location.href = '/login'
  } else if (data.code !== 0) {
    message.error(data.msg)
    return Promise.reject(data)
  }

  return data.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  message.error(error.message)
  return Promise.reject(error);
});

export default {
  //✅返回类型：传入T，返回Promise<T> 
  get<T>(url: string, params?: any): Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, params?: any): Promise<T> {
    return instance.post(url, params)
  }
}