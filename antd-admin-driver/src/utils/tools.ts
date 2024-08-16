import { IMenu } from "@/types/modules/api";

export const getMenuPath = (list: IMenu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: IMenu.MenuItem) => {
    // 如果有children 且 没有Button 说明不是最末端菜单地址。直接判断有path也行吧
    return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path as string)
  }, [])
};

// 递归获取路由对象
export const searchRoute: any = (path: string, routes: any = []) => {
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      return searchRoute(path, item.children)
    }
  }

  return ''
}

/**
 * 手机号加密✅
 * @example
 * 189111112222 => 189****2222
 * 保留前3位，中间是任意的，末尾是4位
 * 如果替换中间的呢，可以通过中间子表达式包裹进行替换
 * 或者前面和后面包裹起来作为子表达式
 * 括号包裹起来的都是子表达式
 */

export const formatMobile = (num?: string | number) => {
  if (!num) return ''
  const mobile = num.toString()
  return mobile.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
};
