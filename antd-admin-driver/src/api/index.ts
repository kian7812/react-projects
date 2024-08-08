import request from "@/utils/request";
import { ILogin, IUser, IDashBoard } from '@/types/modules/api'

export default {
  // 登录
  login(params: ILogin.params) {
    return request.post('/users/login', params)
  },
  // 获取用户信息
  getUserInfo() {
    return request.get<IUser.UserInfo>('/users/getUserInfo')
  },
  // 获取报表信息
  getReportData() {
    return request.get<IDashBoard.reportData>('/order/dashboard/getReportData')
  }
}