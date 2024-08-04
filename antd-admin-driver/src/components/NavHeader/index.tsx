import { Breadcrumb, Dropdown, MenuProps, Switch } from "antd"
import { MenuFoldOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import storage from '@/utils/storage';
import { useEffect } from "react";


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
      key: '1',
      label: '邮箱：Danny@xx.com'
    },
    {
      key: '2',
      label: '退出'
    }
  ]

  useEffect(() => {
    // storage
  })

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuFoldOutlined className={styles.mr10} />
        <Breadcrumb items={breadList} />
      </div>
      <div className={styles.right}>
        <Switch className={styles.mr10} checkedChildren="暗黑" unCheckedChildren="默认" />
        <Dropdown menu={{ items }} trigger={['click']}>
          <span className={styles.nickName}>{userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}