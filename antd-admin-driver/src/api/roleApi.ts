import request from "@/utils/request";
import { IRole } from '@/types/modules/api'
import { ResultData } from "@/types/modules/common";

export default {
  //【角色管理】

  // 列表
  getRoleList(params?: IRole.Params) {
    return request.get<ResultData<IRole.RoleItem>>('/role/list', params)
  },
  // 所有角色列表
  getAllRoleList() {
    return request.get<IRole.RoleItem[]>('/role/all/list')
  },
  // 创建
  createRole(params: IRole.CreateParams) {
    return request.post('/role/create', params)
  },
  // 编辑
  editRole(params: IRole.EditParams) {
    return request.post('/role/edit', params)
  },
  // 删除
  deleteRole(params: IRole.DeleteParams) {
    return request.post('/role/delete', params)
  },
  // 设置权限
  updatePermission(params: IRole.Permission) {
    return request.post('/role/update/permission', params)
  },
}