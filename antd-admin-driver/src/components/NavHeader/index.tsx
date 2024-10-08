import {
  Breadcrumb,
  Dropdown,
  MenuProps,
  Switch,
} from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import storage from '@/utils/storage';
import { useUserInfoStore } from '@/store';
import { useEffect } from 'react';

export default function NavHeader() {
  // const userName = storage.get('userInfo').userName
  const userInfo = useUserInfoStore(
    (state) => state.userInfo,
  );
  const isDark = useUserInfoStore((state) => state.isDark);
  const updateTheme = useUserInfoStore(
    (state) => state.updateTheme,
  );

  const breadList = [
    {
      title: '首页',
    },
    {
      title: '工作台',
    },
  ];

  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: `邮箱：${userInfo.userName}@123.com`,
    },
    {
      key: 'logout',
      label: '退出',
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.remove('token');
      location.href =
        '/login?callback=' +
        encodeURIComponent(location.href);
    }
  };

  useEffect(() => {
    // 刷新页面
    handleSwitch(isDark);
  }, []);

  // 亮暗主题切换
  const handleSwitch = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.dataset.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.dataset.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
    storage.set('isDark', isDark);
    updateTheme(isDark);
  };

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuFoldOutlined className={styles.mr10} />
        <Breadcrumb items={breadList} />
      </div>
      <div className={styles.right}>
        <Switch
          checked={isDark}
          className={styles.mr10}
          checkedChildren='暗黑'
          unCheckedChildren='默认'
          onChange={handleSwitch}
        />
        <Dropdown menu={{ items, onClick }}>
          <span className={styles.nickName}>
            {userInfo.userName}
          </span>
        </Dropdown>
      </div>
    </div>
  );
}
