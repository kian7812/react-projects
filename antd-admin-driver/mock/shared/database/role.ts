import { defineMockData } from 'vite-plugin-mock-dev-server';
import { randomString } from '../utils/tools';

const dayTimestamp = 1000 * 60 * 60 * 24;
const monthTimestamp = dayTimestamp * 30;
let now = Date.now();
// 生成时间
function generateCreateTime() {
  now = now - monthTimestamp * 2;
  return now;
}

//  角色 checkedKeys、halfCheckedKeys 和 菜单 _id 一样 
export const roleList = defineMockData('roleList', {
  page: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
  list: [
    {
      permissionList: {
        checkedKeys: [],
        halfCheckedKeys: [],
      },
      _id: '655dbed711c02c8597dce76b',
      roleName: '产品',
      remark: '备注1',
      createId: 1000002,
      updateTime: '2023-11-22T08:23:39.918Z',
      createTime: '2023-11-22T08:23:39.918Z',
    },
    {
      _id: '655dbedb11c02c8597dce76f',
      roleName: '技术',
      remark: '备注2',
      createId: 1000002,
      updateTime: '2023-11-22T08:23:39.918Z',
      createTime: '2023-11-22T08:23:39.918Z',
      permissionList: {
        checkedKeys: [
          '655db4a4f10762608048caf4',
          '655db556f10762608048cb02',
          '655dc53ed4dc6d6fda15dbad',
          '655dc67ed4dc6d6fda15dbc7',
          '655dc68ad4dc6d6fda15dbcb',
          '655db5a8f10762608048cb0a',
          '655dc69bd4dc6d6fda15dbcf',
          '655dc6a5d4dc6d6fda15dbd3',
          '655dc6afd4dc6d6fda15dbd7',
          '655dbb0011c02c8597dce710',
          '655dc6c7d4dc6d6fda15dbdb',
          '655dc6d3d4dc6d6fda15dbdf',
          '655dc6ddd4dc6d6fda15dbe3',
          '655dbbc411c02c8597dce720',
          '655dc6f4d4dc6d6fda15dbe7',
          '655dc6fdd4dc6d6fda15dbeb',
          '655dc708d4dc6d6fda15dbef',
          '655dbc4d11c02c8597dce72c',
          '655dc735d4dc6d6fda15dbf6',
          '655dc73fd4dc6d6fda15dbfa',
          '655dc74cd4dc6d6fda15dbfe',
          '655dbc7911c02c8597dce734',
          '655dbcb011c02c8597dce73c',
        ],
        halfCheckedKeys: [
          '655db45ff10762608048caec',
          '655db520f10762608048cafa',
          '655db546f10762608048cafe',
          '655db59bf10762608048cb06',
          '655db5c7f10762608048cb0e',
          '655dbbb911c02c8597dce71c',
          '655dbc1e11c02c8597dce724',
          '655dbc3811c02c8597dce728',
          '655dbc6c11c02c8597dce730',
          '655dbca311c02c8597dce738',
        ],
      },
    },
  ],
});

// 创建
export const createRole = params => {
  const item = {
    permissionList: {
      checkedKeys: [],
      halfCheckedKeys: [],
    },
    _id: '',
    roleName: '',
    remark: '',
    createId: 1000002,
    updateTime: generateCreateTime(),
    createTime: generateCreateTime(),
  };

  const newItem = {
    ...item,
    ...params,
    _id: randomString(),
  };

  roleList.value.list.push(newItem);
};

// 编辑、权限设置
export const editRole = params => {
  const index = roleList.value.list.findIndex(
    o => (o._id) === (params._id),
  );
  const item = roleList.value.list[index];
  roleList.value.list.splice(index, 1, {
    ...item,
    ...params,
  });
};

// 删除
export const deleteRole = params => {
  const index = roleList.value.list.findIndex(
    o => (o._id) === (params._id),
  );
  roleList.value.list.splice(index, 1);
};
