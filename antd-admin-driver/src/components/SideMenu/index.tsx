import { Menu, MenuProps } from 'antd'
import {
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];


export default function SideMenu() {
  const navigate = useNavigate()

  const items: MenuItem[] = [
    {
      label: '工作台',
      key: '/dashboard',
      icon: <DesktopOutlined />
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined />,
        },
        {
          label: '部门管理',
          key: '4',
          icon: <TeamOutlined />,
        },
      ]
    },
  ]

  const goHome = () => {
    navigate('/welcome')
  }

  return (
    <div>
      <h1 className={styles.title} onClick={goHome}>管理系统</h1>

      <Menu
        defaultSelectedKeys={['1']}
        mode='inline'
        theme='dark'
        items={items}
      />
    </div>
  )
}