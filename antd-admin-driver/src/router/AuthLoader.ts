// 路由拦截器，支持异步

import api from "@/api"
import { getMenuPath } from "@/utils/tools"

export default async function AuthLoader() {
  const data = await api.getPermissionList()

  const menuPathList = getMenuPath(data.menuList)

  return {
    buttonList: data.buttonList,
    menuList: data.menuList, // 用来渲染菜单
    menuPathList: menuPathList // 筛选出带path的，做动态路由
  }
};
