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
      const result = searchRoute(path, item.children)
      if (result) return result
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


/**
 * 递归查找树的路径
 * @params paths 需要返回的数据
 * @params targetPath 要查找的路径
 */

export const findTreeNode = (tree: IMenu.MenuItem[], targetPath: string, paths: string[] = []): string[] => {
  if (!tree) return []

  for (const item of tree) {
    paths.push(item.menuName)
    if (item.path === targetPath) return paths

    if (item.children?.length) {
      const result = findTreeNode(item.children, targetPath, paths)
      // result 到最后是否能找到，如果没有，再一层层pop出去
      if (result?.length) return result
    }

    paths.pop()
  }

  return []
};
