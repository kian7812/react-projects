import { Breadcrumb, Dropdown, MenuProps, Switch } from "antd"
import { MenuFoldOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import storage from '@/utils/storage';


export default function NavHeader() {
  const userName = storage.get('userInfo').userName

  const breadList = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    },
  ]

  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱：Danny@xx.com'
    },
    {
      key: 'logout',
      label: '退出'
    }
  ]


  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    }
  }

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuFoldOutlined className={styles.mr10} />
        <Breadcrumb items={breadList} />
      </div>
      <div className={styles.right}>
        <Switch className={styles.mr10} checkedChildren="暗黑" unCheckedChildren="默认" />
        <Dropdown menu={{ items, onClick }}>
          <span className={styles.nickName}>{userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}