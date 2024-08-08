// tsx 文件

import { createBrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import Login from '@/views/Login';
import NotFound from '@/views/404';
import Welcome from '@/views/Welcome';
import DefaultLayout from '@/layout/DefaultLayout';
import Dashboard from '@/views/Dashboard';

const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' /> // 使用 Navigate 重定向
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  },
  // ✅路由不存在
  {
    path: '*',
    element: <Navigate to='404' /> // ✅通过Navigate组件重定向到404路由
  },
  // 404
  {
    path: '/404',
    element: <NotFound />
  }
]

// ✅使用 useRoutes 定义路由 返回 Router组件
// export function Router() {
//   return useRoutes(router)
// }

// 推荐使用 api 定义路由，它支持loader，路由拦截
export default createBrowserRouter(router)