// tsx 文件

import { createBrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import Login from '@/views/Login';
import NotFound from '@/views/404';
import Welcome from '@/views/Welcome';
import DefaultLayout from '@/layout/DefaultLayout';
import Dashboard from '@/views/Dashboard';
import UserList from '@/views/System/User/UserList';
import UserList2 from '@/views/System/User/UserList2';
import DeptList from '@/views/System/Dept/DeptList';
import MenuList from '@/views/System/Menu/MenuList';
import AuthLoader from './AuthLoader';

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
    // 路由拦截器，路由中间件
    id: 'layout',
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/userList',
        element: <UserList />
      },
      {
        // 使用了 useAntdTable
        path: '/userList2',
        element: <UserList2 />
      },
      {
        path: '/deptList',
        element: <DeptList />
      },
      {
        path: '/menuList',
        element: <MenuList />
      },
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

// 推荐使用 api 定义路由，✅它支持loader，路由拦截
export default createBrowserRouter(router)