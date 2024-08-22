// tsx 文件

import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  useRoutes,
} from 'react-router-dom';
import Login from '@/views/Login';
import NotFound404 from '@/views/404';
import NotFound403 from '@/views/403';
import Welcome from '@/views/Welcome';
import DefaultLayout from '@/layout/DefaultLayout';
// import Dashboard from '@/views/Dashboard';
import UserList from '@/views/System/User/UserList';
import UserList2 from '@/views/System/User/UserList2';
import DeptList from '@/views/System/Dept/DeptList';
import MenuList from '@/views/System/Menu/MenuList';
import AuthLoader from './AuthLoader';
import RoleList from '@/views/System/Role/RoleList';
import OrderList from '@/views/Order/OrderList';
import DriverList from '@/views/Order/DriverList';
import LazyLoad from './LazyLoad';

const Dashboard2 = lazy(() => import('@/views/Dashboard'));

export const router = [
  {
    path: '/',
    element: <Navigate to='/welcome' />, // 使用 Navigate 重定向
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <DefaultLayout />,
    // 路由拦截器，路由中间件
    id: 'layout',
    loader: AuthLoader,
    children: [
      {
        path: '/welcome',
        element: <Welcome />,
      },
      {
        path: '/dashboard',
        // element: <Dashboard />,
        // 不可以
        // element: LazyLoad(Dashboard2),
        // 可以
        element: (
          <LazyLoad>
            <Dashboard2 />
          </LazyLoad>
        ),
        // 可以
        // element: (
        //   <Suspense fallback={<h2>加载中....</h2>}>
        //     <Dashboard2 />
        //   </Suspense>
        // ),
      },
      {
        path: '/userList',
        element: <UserList />,
      },
      {
        // 使用了 useAntdTable
        path: '/userList2', // userList2 不在权限列表，会报403，如查看替换下路由
        element: <UserList2 />,
      },
      {
        path: '/deptList',
        element: <DeptList />,
      },
      {
        path: '/menuList',
        meta: {
          auth: false, // 关闭权限验证，测试
        },
        element: <MenuList />,
      },
      {
        path: '/roleList',
        element: <RoleList />,
      },
      {
        path: '/orderList',
        element: <OrderList />,
      },
      {
        path: '/driverList',
        element: <DriverList />,
      },
    ],
  },
  // ✅路由不存在
  {
    path: '*',
    element: <Navigate to='404' />, // ✅通过Navigate组件重定向到404路由
  },
  // 404
  {
    path: '/404',
    element: <NotFound404 />,
  },
  // 403
  {
    path: '/403',
    element: <NotFound403 />,
  },
];

// ✅使用 useRoutes 定义路由 返回 Router组件
// export function Router() {
//   return useRoutes(router)
// }

// 推荐使用 api 定义路由，✅它支持loader，路由拦截
export default createBrowserRouter(router);
