// 路由拦截器，支持异步

import api from "@/api"

export default async function AuthLoader() {
  const data = await api.getPermissionList()

  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList: []
  }
};
