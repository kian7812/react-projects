// 路由拦截器，支持异步

import api from "@/api"
import { IMenu } from "@/types/modules/api"
import { getMenuPath } from "@/utils/tools"

export interface IAuthLoader {
  buttonList: string[]
  menuList: IMenu.MenuItem[]
  menuPathList: string[]
}

export default async function AuthLoader() {
  const data = await api.getPermissionList()

  const menuPathList = getMenuPath(data.menuList)

  return { // 也可以保存到store中
    buttonList: data.buttonList,
    menuList: data.menuList, // ✅用来渲染菜单
    menuPathList: menuPathList // ✅筛选出带path的，用于路由拦截-权限判断（这这是前端的，还需要接口同样做权限拦截）
  }
};
