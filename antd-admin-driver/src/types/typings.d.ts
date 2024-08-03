// import { AxiosRequestConfig } from 'axios'
import axios from 'axios' // 或 直接 axios

declare module 'axios' {
  interface AxiosRequestConfig {
    showLoading?: boolean
    showError?: boolean
  }
}