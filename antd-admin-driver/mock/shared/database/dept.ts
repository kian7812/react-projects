import { defineMockData } from 'vite-plugin-mock-dev-server'

const dayTimestamp = 1000 * 60 * 60 * 24
const monthTimestamp = dayTimestamp * 30
let now = Date.now()
function generateCreateTime() {
  now = now - (monthTimestamp * 2)
  return now
}

// id 递加 每次新增加
let idNumber = 2



export const deptList = defineMockData('deptList', {
  page: {},
  list: [
    {
      _id: 1,
      createTime: generateCreateTime(),
      updateTime: generateCreateTime(),
      deptName: '研发部',
      // createId: 1001,
      userName: 'Tom',
      parentId: '',
      children: [
        {
          _id: 2,
          parentId: 1,
          createTime: generateCreateTime(),
          updateTime: generateCreateTime(),
          deptName: '大前端',
          // createId: 1002,
          userName: 'Tom2',
          children: null
        },
      ]
    },
  ]
})

// 创建、编辑、删除 都没做子集遍历

// 创建
export const createDept = (params) => {
  const item = {
    _id: '',
    parentId: '',
    createTime: generateCreateTime(),
    updateTime: generateCreateTime(),
    deptName: '',
    userName: '',
    children: null
  }

  idNumber = idNumber + 1
  const _id = idNumber

  const dept = {
    ...item,
    ...params,
    _id,
  }

  deptList.value.list.push(dept)
}

// 编辑
export const editDept = (params) => {
  const index = deptList.value.list.findIndex(u => Number(u._id) === Number(params._id))
  const item = deptList.value.list[index]
  deptList.value.list.splice(index, 1, {
    ...item,
    ...params
  })
}

// 删除
export const deleteDept = (params) => {
  const index = deptList.value.list.findIndex(u => Number(u._id) === Number(params._id))
  deptList.value.list.splice(index, 1)
}