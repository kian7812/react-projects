import { IAuthLoader } from '@/router/AuthLoader';
import { searchRoute } from '@/utils/tools';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useRouteLoaderData,
} from 'react-router-dom';

interface ITabsItem {
  key: string;
  label: string;
  closable: boolean;
}

export default function NavTabs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [tabsList, setTabsList] = useState<ITabsItem[]>([
    {
      key: '/welcome',
      label: '首页',
      closable: false,
    },
  ]);
  const [activeKey, setActiveKey] = useState('');
  const data = useRouteLoaderData('layout') as IAuthLoader; // ✅ 没有泛型只能做强转换

  // 首次和当路由地址变化时
  useEffect(() => {
    addTabs();
  }, [pathname]);

  // 添加页签
  const addTabs = () => {
    const route = searchRoute(pathname, data.menuList);
    if (!route) return; // 兼容 /welcome
    // 去重
    if (!tabsList.find((o) => o.key === route.path)) {
      tabsList?.push({
        key: route.path,
        label: route.menuName,
        closable: pathname !== '/welcome',
      });
    }

    setTabsList([...tabsList]);
    setActiveKey(pathname);
  };

  // 点击tab
  const handleChange = (path: string) => {
    navigate(path);
  };

  // 关闭 tab
  const handleDel = (path: string) => {
    // 如果当前页面关闭
    if (pathname === path) {
      tabsList.forEach((item, index) => {
        if (item.key !== pathname) {
          return;
        }
        // 寻找下一个可跳转的path，先找右边，没有再找左边
        const nextTab =
          tabsList[index + 1] || tabsList[index - 1];
        if (!nextTab) {
          return;
        }
        navigate(nextTab.key);
      });
    }
    // 如果不是当前页面
    setTabsList(tabsList.filter((o) => o.key !== path));
  };

  return (
    <Tabs
      activeKey={activeKey}
      items={tabsList}
      tabBarStyle={{
        height: 40,
        marginBottom: 0,
        backgroundColor: 'var(--driver-bg-color)',
      }}
      type='editable-card'
      hideAdd
      onChange={handleChange}
      onEdit={(path) => handleDel(path as string)}
    />
  );
}
