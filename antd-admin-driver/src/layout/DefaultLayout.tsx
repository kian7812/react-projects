import React, { useEffect } from 'react';
import { Layout, Menu, theme, Watermark } from 'antd';
import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/NavFooter';
import SideMenu from '@/components/SideMenu';
import { Outlet } from 'react-router-dom';
import styles from './index.module.less'
import api from '@/api';
import storage from '@/utils/storage';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  // 样式
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  useEffect(() => {
    getUserInfo()
  })

  // 用户信息接口
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    console.log(data);
    storage.set('userInfo', data)
  }

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