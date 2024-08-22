import React, { useEffect } from 'react';
import { Layout, theme, Watermark } from 'antd';
import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/NavFooter';
import SideMenu from '@/components/SideMenu';
import {
  Navigate,
  Outlet,
  useLocation,
  useRouteLoaderData,
} from 'react-router-dom';
import styles from './index.module.less';
import api from '@/api';
import storage from '@/utils/storage';
import { useUserInfoStore } from '@/store/index';
import { IAuthLoader } from '@/router/AuthLoader';
import { searchRoute } from '@/utils/tools';
import { router } from '@/router';
import NavTabs from '@/components/NavTabs';

const { Content, Sider } = Layout;

const App: React.FC = () => {
  const updateUserInfo = useUserInfoStore(
    state => state.updateUserInfo,
  );
  const { pathname } = useLocation();

  useEffect(() => {
    getUserInfo();
  }, []);

  // 用户信息接口
  const getUserInfo = async () => {
    const data = await api.getUserInfo();
    console.log(data);
    storage.set('userInfo', data);
    updateUserInfo(data);
  };

  // ✅权限开关 meta.auth
  const route = searchRoute(pathname, router);
  const data = useRouteLoaderData('layout') as IAuthLoader; // ✅ 没有泛型只能做强转换

  if (route && route.meta?.auth === false) {
    // 等于false 不需要权限验证，继续执行
  } else {
    // ✅路由拦截-权限判断
    const staticPath = ['/welcome', '404', '403'];
    if (
      !data.menuPathList.includes(pathname) &&
      !staticPath.includes(pathname)
    ) {
      return <Navigate to='/403' />;
    }
  }

  // 样式
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    // Watermark 水印✅
    <Watermark content='danny'>
      <Layout className={styles.defaultLayout}>
        <Sider>
          <SideMenu />
        </Sider>

        <Layout>
          <NavHeader />

          <NavTabs />

          <Content className={styles.content}>
            <div
              className={styles.outletWrapper}
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}>
              <Outlet />
            </div>
            <NavFooter />
          </Content>
        </Layout>
      </Layout>
    </Watermark>
  );
};

export default App;
