import React, { useEffect } from 'react';
import { Layout, Menu, theme, Watermark } from 'antd';
import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/NavFooter';
import SideMenu from '@/components/SideMenu';
import { Outlet, useRouteLoaderData } from 'react-router-dom';
import styles from './index.module.less'
import api from '@/api';
import storage from '@/utils/storage';
import { useUserInfoStore } from '@/store/index'

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const updateUserInfo = useUserInfoStore((state) => state.updateUserInfo)

  useEffect(() => {
    getUserInfo()
  })

  // 用户信息接口
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    console.log(data);
    storage.set('userInfo', data)
    updateUserInfo(data)
  }

  // 样式
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 路由拦截
  const data = useRouteLoaderData('layout')
  console.log(123, data)


  return (
    // Watermark 水印✅ 
    <Watermark content="danny">
      <Layout className={styles.defaultLayout}>
        <Sider>
          <SideMenu />
        </Sider>

        <Layout>
          <NavHeader />

          <Content className={styles.content}>
            <div
              className={styles.outletWrapper}
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
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