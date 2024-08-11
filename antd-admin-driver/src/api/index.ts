import request from "@/utils/request";
import { ILogin, IUser, IDashBoard, IDept } from '@/types/modules/api'
import { ResultData } from "@/types/modules/common";

export default {
  // 登录
  login(params: ILogin.params) {
    return request.post('/users/login', params)
  },
  // --用户管理--
  // 获取用户信息
  getUserInfo() {
    return request.get<IUser.UserInfo>('/users/getUserInfo')
  },
  // 获取报表信息
  getReportData() {
    return request.get<IDashBoard.reportData>('/order/dashboard/getReportData')
  },
  // 获取用户列表
  getUserList(params: IUser.Params) {
    return request.get<ResultData<IUser.UserInfo>>('/users/list', params)
  },
  // 获取用户列表
  getUserAllList() {
    return request.get<IUser.UserInfo[]>('/users/all/list')
  },
  // 创建用户
  createUser(params: IUser.CreateParams) {
    return request.post('/users/create', params)
  },
  // 编辑用户
  editUser(params: IUser.EditParams) {
    return request.post('/users/edit', params)
  },
  // 删除和批量删除用户
  delUser(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  },

  // --部门管理--
  // 部门列表
  getDeptList(params?: IDept.Params) {
    return request.get<IDept.DeptItem[]>('/dept/list', params)
  },
  // 创建
  createDept(params: IDept.CreateParams) {
    return request.post('/dept/create', params)
  },
  // 编辑
  editDept(params: IDept.EditParams) {
    return request.post('/dept/edit', params)
  },
  // 删除
  deleteDept(params: IDept.DeleteParams) {
    return request.post('/dept/delete', params)
  },
}