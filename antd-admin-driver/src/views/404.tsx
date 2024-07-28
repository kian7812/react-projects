import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"


function NotFound() {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  return (
    <Result
      status={404}
      title="404"
      subTitle="Sorray, the page you visited does not exist."
      extra={<Button type="primary" onClick={goHome}>Back Home</Button>}
    />
  )
}

export default NotFound