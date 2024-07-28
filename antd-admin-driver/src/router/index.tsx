// tsx 文件

import { createBrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import Login from '@/views/login/Login';
import NotFound from '@/views/404';

const router = [
  {
    path: '/',
    element: <div>wel</div>
  },
  {
    path: '/login',
    element: <Login />
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