import { RouterProvider, BrowserRouter } from "react-router-dom"
import router from './router';
import { ConfigProvider, App as AntdApp } from "antd";
import AntdGlobal from '@/components/AntdGlobal'


function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ed6c00'
        }
      }}
    >
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={router} />
      </AntdApp>

    </ConfigProvider>
  )

  // ✅ useRoutes 定义路由的方式
  // return (
  //   <BrowserRouter>
  //     <Router />
  //   </BrowserRouter>
  // )

}

export default App
