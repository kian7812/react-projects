import { RouterProvider, BrowserRouter } from "react-router-dom"
import router from './router';


function App() {

  return <RouterProvider router={router} />

  // ✅ useRoutes 定义路由的方式
  // return (
  //   <BrowserRouter>
  //     <Router />
  //   </BrowserRouter>
  // )

}

export default App
