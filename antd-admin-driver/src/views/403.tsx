import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"


function NotFound() {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  return (
    <Result
      status={403}
      title="403"
      subTitle="抱歉，您当前没有权限访问此页面"
      extra={<Button type="primary" onClick={goHome}>Back Home</Button>}
    />
  )
}

export default NotFound