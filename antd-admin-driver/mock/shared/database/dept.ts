import { defineMockData } from 'vite-plugin-mock-dev-server';
import { randomString } from '../utils/tools';

const dayTimestamp = 1000 * 60 * 60 * 24;
const monthTimestamp = dayTimestamp * 30;
let now = Date.now();
function generateCreateTime() {
  now = now - monthTimestamp * 2;
  return now;
}

export const deptList = defineMockData('deptList', {
  page: {},
  list: [
    {
      _id: '655dbeee11c02c8597dce776',
      deptName: '技术中心',
      userName: 'admin',
      parentId: '',
      createId: 1000002,
      updateTime: '2023-11-22T08:23:39.919Z',
      createTime: '2023-11-22T08:23:39.919Z',
      __v: 0,
      children: [
        {
          _id: '655dbef811c02c8597dce77a',
          deptName: '大前端',
          userName: 'Jack',
          parentId: '655dbeee11c02c8597dce776',
          createId: 1000002,
          updateTime: '2023-11-22T08:23:39.919Z',
          createTime: '2023-11-22T08:23:39.919Z',
          __v: 0,
        },
        {
          _id: '655dc06811c02c8597dce7ae',
          deptName: '测试部门',
          userName: 'Jack',
          parentId: '655dbeee11c02c8597dce776',
          createId: 1000002,
          updateTime: '2023-11-22T08:48:49.920Z',
          createTime: '2023-11-22T08:23:39.919Z',
          __v: 0,
        },
        {
          _id: '655dc07e11c02c8597dce7b5',
          deptName: '产品中心',
          userName: 'Jack',
          parentId: '655dbeee11c02c8597dce776',
          createId: 1000002,
          updateTime: '2023-11-22T08:23:39.919Z',
          createTime: '2023-11-22T08:23:39.919Z',
          __v: 0,
        },
        {
          _id: '655dc08911c02c8597dce7b9',
          deptName: '营销中心',
          userName: 'Jack',
          parentId: '655dbeee11c02c8597dce776',
          createId: 1000002,
          updateTime: '2023-11-22T08:23:39.919Z',
          createTime: '2023-11-22T08:23:39.919Z',
          __v: 0,
        },
        {
          _id: '655dc09311c02c8597dce7bd',
          deptName: '增长中心',
          userName: 'Jack',
          parentId: '655dbeee11c02c8597dce776',
          createId: 1000002,
          updateTime: '2023-11-22T08:23:39.919Z',
          createTime: '2023-11-22T08:23:39.919Z',
          __v: 0,
        },
      ],
    },
  ],
});

// 创建、编辑、删除 都没做子集遍历

// 创建
export const createDept = params => {
  const item = {
    _id: '',
    deptName: '',
    userName: '',
    parentId: '',
    createId: 1000002,
    createTime: generateCreateTime(),
    updateTime: generateCreateTime(),
    __v: 0,
  };

  const dept = {
    ...item,
    ...params,
    _id: randomString(),
  };

  deptList.value.list.push(dept);
};

// 编辑
export const editDept = params => {
  const index = deptList.value.list.findIndex(
    u => (u._id) === (params._id),
  );
  const item = deptList.value.list[index];
  deptList.value.list.splice(index, 1, {
    ...item,
    ...params,
  });
};

// 删除
export const deleteDept = params => {
  const index = deptList.value.list.findIndex(
    u => (u._id) === (params._id),
  );
  deptList.value.list.splice(index, 1);
};
