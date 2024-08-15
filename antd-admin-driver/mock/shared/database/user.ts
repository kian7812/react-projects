import { defineMockData } from 'vite-plugin-mock-dev-server';

const dayTimestamp = 1000 * 60 * 60 * 24;
const monthTimestamp = dayTimestamp * 30;
let now = Date.now();
function generateCreateTime() {
  now = now - monthTimestamp * 2;
  return now;
}

// id 递加 每次新增加
let idNumber = 100028;

export const users = defineMockData('users', [
  { id: 1, name: 'Danny' },
  { id: 2, name: 'Tom' },
]);

export const usersList = defineMockData('usersList', {
  page: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
  // 下面部门deptId 不是正常数据，页面显示不正常，也没关系，正常编辑
  list: [
    {
      userImg:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      createTime: '2023-11-22T10:44:25.532Z',
      userId: 1000016,
      userName: 'JackMa',
      userEmail: 'jackma@mars.com',
      mobile: '17011221122',
      sex: 0,
      deptId: '',
      deptName: '',
      job: '前端工程师',
      state: 1,
      role: 2,
      createId: 1000002,
      lastLoginTime: '2024-08-15T03:15:31.202Z',
      roleList: '655dbedb11c02c8597dce76f',
    },
    {
      userId: 100017,
      userName: 'JackBean',
      userEmail: 'jackbean@mars.com',
      deptId: '655dbef811c02c8597dce77a',
      deptName: '大前端',
      state: 1,
      role: 1,
      roleList: '655dbedb11c02c8597dce76f',
      createId: 1000002,
      userImg: '',
      createTime: '2023-11-22T08:52:47.963Z',
      lastLoginTime: '2024-07-22T08:15:24.102Z',
      __v: 0,
    },
    {
      userId: 100018,
      userName: '9549587',
      userEmail: '9549587@mars.com',
      deptId: '',
      deptName: '',
      state: 1,
      role: 1,
      roleList: '',
      createId: 1000002,
      userImg:
        'http://api-driver.marsview.cc/3f9393c68f57ac57704652f00.png',
      createTime: '2023-11-22T08:52:47.963Z',
      lastLoginTime: '2024-03-05T07:18:46.815Z',
      __v: 0,
      job: '测试',
    },
    {
      userId: 100020,
      userName: '1366143860',
      userEmail: '1366143860@mars.com',
      deptId: '6568c7254a54800ac8d5b18e',
      deptName: '部门5',
      state: 1,
      role: 1,
      roleList: '',
      createId: 1000002,
      userImg:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      createTime: '2023-11-22T08:52:47.963Z',
      lastLoginTime: '2024-04-14T07:12:57.797Z',
      mobile: '13072361279',
      job: '前端1',
    },
    {
      userId: 100022,
      userName: '413401333',
      userEmail: '413401333@mars.com',
      deptId: '6582ae994a54800ac8d76b80',
      deptName: '前端',
      state: 1,
      role: 1,
      roleList: '6582aeb44a54800ac8d76b88',
      createId: 1000002,
      userImg:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      createTime: '2023-11-22T08:52:47.963Z',
      lastLoginTime: '2024-06-01T06:06:23.234Z',
      job: '前端',
    },
    {
      userId: 100023,
      userName: '1050732226',
      userEmail: '1050732226@mars.com',
      deptId: '',
      deptName: '大前端',
      state: 1,
      role: 1,
      roleList: '',
      createId: 1000002,
      userImg:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      createTime: '2023-11-22T08:52:47.963Z',
      lastLoginTime: '2024-03-08T08:33:42.675Z',
    },
    {
      userId: 100024,
      userName: '191337035',
      userEmail: '191337035@mars.com',
      deptId: '',
      deptName: '大前端',
      state: 1,
      role: 1,
      roleList: '',
      createId: 1000002,
      userImg:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      createTime: '2023-11-22T08:52:47.963Z',
      lastLoginTime: '2024-05-29T02:02:06.830Z',
    },
    {
      userId: 100025,
      userName: '717210290',
      userEmail: '717210290@mars.com',
      deptId: '',
      deptName: '大前端',
      state: 1,
      role: 1,
      roleList: '',
      createId: 1000002,
      userImg:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      createTime: '2023-11-22T08:52:47.963Z',
      lastLoginTime: '2024-07-01T16:46:53.689Z',
    },
    {
      userId: 100027,
      userName: '475721797',
      userEmail: '475721797@mars.com',
      deptId: '65eacdb84a54800ac8dd6183',
      deptName: '2312312',
      state: 1,
      role: 1,
      roleList: '65eaeafb4a54800ac8dd6429',
      createId: 1000002,
      userImg:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      createTime: '2023-11-22T08:52:47.963Z',
      lastLoginTime: '2024-07-01T16:42:10.830Z',
    },
    {
      userId: 100028,
      userName: '1667519970',
      userEmail: '1667519970@mars.com',
      deptId: '666020984a54800ac8e38f05',
      deptName: '产品中心',
      state: 1,
      role: 1,
      roleList: '665fd3194a54800ac8e38b84',
      createId: 1000002,
      userImg:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      createTime: '2023-11-22T08:52:47.963Z',
      lastLoginTime: '2024-07-23T01:57:46.038Z',
      job: '产品经理',
      mobile: '16675199700',
    },
  ],
});

export const createOneUser = params => {
  const item = {
    userImg:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    createTime: generateCreateTime(),
    userId: 0,
    userName: '',
    userEmail: '',
    mobile: '',
    sex: 0,
    deptId: '',
    deptName: '',
    job: '',
    state: 1,
    role: 2,
    createId: 1000002,
    lastLoginTime: '',
    roleList: '',
  };

  idNumber = idNumber + 1;
  const userId = idNumber;

  const user = {
    ...item,
    ...params,
    userId,
  };

  usersList.value.list.push(user);
};

export const editOneUser = params => {
  const index = usersList.value.list.findIndex(
    u => Number(u.userId) === Number(params.userId),
  );
  const item = usersList.value.list[index];
  usersList.value.list.splice(index, 1, {
    ...item,
    ...params,
  });
};

// 删除一个或多个，一般真是接口，不做真删除
export const deleteUser = params => {
  params.userIds.forEach(userId => {
    const index = usersList.value.list.findIndex(
      u => Number(u.userId) === Number(userId),
    );
    usersList.value.list.splice(index, 1);
  });
};
