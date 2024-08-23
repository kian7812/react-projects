import { Menu, MenuProps } from 'antd';

import styles from './index.module.less';
import {
  useLocation,
  useNavigate,
  useRouteLoaderData,
} from 'react-router-dom';
import { IMenu } from '@/types/modules/api';
import { useEffect, useState } from 'react';
import React from 'react';
import {
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  MenuOutlined,
  TrademarkCircleOutlined,
  SendOutlined,
  CloudOutlined,
  BarsOutlined,
  DotChartOutlined,
  PayCircleOutlined,
} from '@ant-design/icons';
import { useUserInfoStore } from '@/store';

type MenuItem = Required<MenuProps>['items'][number];

const Icons = {
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  MenuOutlined,
  TrademarkCircleOutlined,
  SendOutlined,
  CloudOutlined,
  BarsOutlined,
  DotChartOutlined,
  PayCircleOutlined,
};

export default function SideMenu() {
  const navigate = useNavigate();
  // const collapsed = useStore(state => state.collapsed)
  const { isDark, collapsed } = useUserInfoStore(
    (state) => ({
      isDark: state.isDark,
      collapsed: state.collapsed,
    }),
  );
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  // ✅路由拦截，获取菜单类别
  const data: any = useRouteLoaderData('layout');
  // 用于菜单高亮选中
  const [selectedKeys, setSelectedKeys] = useState<
    string[]
  >([]);
  // 获取当前path
  const { pathname } = useLocation();

  // ✅ 生成一个菜单项
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem => {
    return {
      label,
      key,
      icon,
      children,
    } as MenuItem;
  };

  // ✅创建icon
  const createIcon = (name?: string) => {
    if (!name) return <></>;
    const customerIcons: { [key: string]: any } = Icons;
    const icon = customerIcons[name];
    if (!icon) return <></>;
    return React.createElement(icon);
  };

  // ✅递归生成菜单，遍历出 菜单类型type为1，且menuState为1启用的菜单，如果有buttons说明是最末级菜单了，不要再遍历了（规则）
  const getTreeMenu = (
    menuList: IMenu.MenuItem[],
    treeList: MenuItem[] = [],
  ) => {
    menuList.forEach((itm, ind) => {
      if (itm.menuType === 1 && itm.menuState === 1) {
        if (itm.buttons?.length) {
          // 递归边界处理，末端不需要children了
          return treeList.push(
            getItem(
              itm.menuName,
              itm.path || ind,
              createIcon(itm.icon),
            ),
          );
        }
        treeList.push(
          getItem(
            itm.menuName,
            itm.path || ind,
            createIcon(itm.icon),
            getTreeMenu(itm.children || []),
          ),
        );
      }
    });
    return treeList;
  };

  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList);
    setMenuList(treeMenuList);
    // 刷新设置SelectedKeys
    setSelectedKeys([pathname]);
  }, []);

  // 回到首页
  const goHome = () => {
    navigate('/welcome');
  };

  // 菜单点击并跳转
  // key 就是上面的 path
  const handleMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    navigate(key);
  };

  // demo
  const items: MenuItem[] = [
    {
      label: '工作台',
      key: '/dashboard',
      icon: <DesktopOutlined />,
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined />,
        },
        {
          label: '部门管理',
          key: '4',
          icon: <TeamOutlined />,
        },
      ],
    },
  ];

  return (
    <div className={styles.sideMenu}>
      <h1 className={styles.title} onClick={goHome}>
        管理系统
      </h1>

      <Menu
        mode='inline'
        theme={isDark ? 'dark' : 'light'}
        style={{
          width: collapsed ? 80 : 'auto',
        }}
        onClick={handleMenu}
        items={menuList}
        selectedKeys={selectedKeys} // 变成受控组件✅
      />
    </div>
  );
}
