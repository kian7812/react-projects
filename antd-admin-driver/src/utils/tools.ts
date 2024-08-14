import { IMenu } from "@/types/modules/api";

export const getMenuPath = (list: IMenu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: IMenu.MenuItem) => {
    // 如果有children 且 没有Button 说明不是最末端菜单地址。直接判断有path也行吧
    return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path as string)
  }, [])
};
