import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Watermark } from 'antd';
import NavHeader from '@/components/NavHeader';
import NavFooter from '@/components/NavFooter';
import SideMenu from '@/components/SideMenu';
import { Outlet } from 'react-router-dom';
import styles from './index.module.less'

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Watermark 水印✅ 

  return (
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