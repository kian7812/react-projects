
import { Button, Form, Input } from 'antd';
import { message } from '@/components/AntdGlobal'
import styles from './index.module.less';
import api from '@/api';
import { ILogin } from '@/types/modules/api';
import storage from '@/utils/storage';
import { useState } from 'react';

export default function Login() {
  const [loading, setLoading] = useState(false)

  const onFinish = (values: ILogin.params) => {
    setLoading(true)
    api.login(values).then((data) => {
      // 保存Token
      storage.set('token', data)

      message.success('登录成功')

      // 跳转到来自页面
      const searchParams = new URLSearchParams(location.search)
      location.href = searchParams.get('callback') || '/welcome'
    }).catch((error) => {
      console.log(error);

    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginWrapper}>
        <div className="loginTitle">系统登录</div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<ILogin.params>
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<ILogin.params>
            name="userPwd"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>


          <Form.Item >
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

// ✅css module 在 Webpack 帮助下 改变了 类名和选择器的作用域,
// 生成唯一class 样式名称
// 目的：解决css中全局作用域的问题
// 全局作用域(:global)