import {
  RouterProvider,
  BrowserRouter,
} from 'react-router-dom';
import router from './router';
import {
  ConfigProvider,
  App as AntdApp,
  theme,
} from 'antd';
import AntdGlobal from '@/components/AntdGlobal';
import { useUserInfoStore } from './store';

function App() {
  const isDark = useUserInfoStore((state) => state.isDark);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#483D8B',
        },
        algorithm: isDark
          ? theme.darkAlgorithm
          : theme.defaultAlgorithm,
      }}>
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );

  // ✅定义路由的方式：使用 useRoutes
  // return (
  //   <BrowserRouter>
  //     <Router />
  //   </BrowserRouter>
  // )
}

export default App;
