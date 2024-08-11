import { defineMockData } from 'vite-plugin-mock-dev-server'

const dayTimestamp = 1000 * 60 * 60 * 24
const monthTimestamp = dayTimestamp * 30
let now = Date.now()
function generateCreateTime() {
  now = now - (monthTimestamp * 2)
  return now
}

// id 递加 每次新增加
let idNumber = 13

export const users = defineMockData('users', [
  { id: 1, name: 'Danny', },
  { id: 2, name: 'Tom', },
])



export const usersList = defineMockData('usersList', {
  page: {
    pageNum: 1,
    pageSize: 10,
    total: 0
  },
  list: [
    {
      _id: 1,
      userId: 1001,
      userName: 'Tom',
      userEmail: 'Tom@xx.com',
      state: 1,
      mobile: '123331',
      job: '前端开发',
      role: 0,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '前端部门',
      userImg: '',
      createTime: generateCreateTime()
    },
    {
      _id: 2,
      userId: 1002,
      userName: 'Even',
      userEmail: 'Even@xx.com',
      state: 1,
      mobile: '334433',
      job: '测试工程师',
      role: 1,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '测试部门',
      userImg: '',
      createTime: generateCreateTime()
    },
    {
      _id: 3,
      userId: 1003,
      userName: 'Even3',
      userEmail: 'Even3@xx.com',
      state: 2,
      mobile: '423432',
      job: '测试工程师3',
      role: 2,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '测试部门',
      userImg: '',
      createTime: generateCreateTime()
    },
    {
      _id: 4,
      userId: 1004,
      userName: 'Tom4',
      userEmail: 'Tom4@xx.com',
      state: 3,
      mobile: '3344443433',
      job: '测试工程师',
      role: 3,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '测试部门',
      userImg: '',
      createTime: generateCreateTime()
    },
    {
      _id: 5,
      userId: 1005,
      userName: 'Even5',
      userEmail: 'Even5@xx.com',
      state: 3,
      mobile: '334433',
      job: '测试工程师',
      role: 3,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '测试部门',
      userImg: '',
      createTime: generateCreateTime(),
    },
    {
      _id: 6,
      userId: 1006,
      userName: 'Even6',
      userEmail: 'Even6@xx.com',
      state: 1,
      mobile: '334433',
      job: '测试工程师',
      role: 1,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '测试部门',
      userImg: '',
      createTime: generateCreateTime(),
    },
    {
      _id: 7,
      userId: 1007,
      userName: 'Even7',
      userEmail: 'Eve7n@xx.com',
      state: 1,
      mobile: '334433',
      job: '测试工程师',
      role: 1,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '测试部门',
      userImg: '',
      createTime: generateCreateTime(),
    },
    {
      _id: 8,
      userId: 1008,
      userName: 'Even8',
      userEmail: 'Even8@xx.com',
      state: 1,
      mobile: '334433',
      job: '测试工程师',
      role: 1,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '测试部门',
      userImg: '',
      createTime: generateCreateTime(),
    },
    {
      _id: 9,
      userId: 1009,
      userName: 'Even9',
      userEmail: 'Even@xx.com',
      state: 1,
      mobile: '334433',
      job: '测试工程师',
      role: 1,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '测试部门',
      userImg: '',
      createTime: generateCreateTime(),
    },
    {
      _id: 10,
      userId: 1010,
      userName: 'Even10',
      userEmail: 'Even@xx.com',
      state: 1,
      mobile: '334433',
      job: '测试工程师',
      role: 1,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '测试部门',
      userImg: '',
      createTime: generateCreateTime(),
    },
    {
      _id: 11,
      userId: 1011,
      userName: 'Even11',
      userEmail: 'Even@xx.com',
      state: 1,
      mobile: '334433',
      job: '测试工程师',
      role: 1,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '测试部门',
      userImg: '',
      createTime: generateCreateTime(),
    },
    {
      _id: 12,
      userId: 1012,
      userName: 'Even11',
      userEmail: 'Even@xx.com',
      state: 1,
      mobile: '334433',
      job: '测试工程师',
      role: 1,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '测试部门',
      userImg: '',
      createTime: generateCreateTime(),
    },
    {
      _id: 13,
      userId: 1013,
      userName: 'Even11',
      userEmail: 'Even@xx.com',
      state: 1,
      mobile: '334433',
      job: '测试工程师',
      role: 1,
      roleList: '',
      createId: 1,
      deptId: '',
      deptName: '测试部门',
      userImg: '',
      createTime: generateCreateTime(),
    },
  ]
})

export const createOneUser = (params) => {
  const item = {
    _id: 1,
    userId: 1001,
    createId: 1,
    userName: '',
    userEmail: '',
    state: 0,
    mobile: '',
    job: '',
    role: 0,
    roleList: '',
    deptId: '',
    deptName: '',
    userImg: '',
    createTime: generateCreateTime()
  }

  idNumber = idNumber + 1
  const _id = idNumber
  const userId = 1000 + _id

  const user = {
    ...item,
    ...params,
    _id,
    userId
  }

  usersList.value.list.push(user)
}

export const editOneUser = (params) => {
  const index = usersList.value.list.findIndex(u => Number(u.userId) === Number(params.userId))
  const item = usersList.value.list[index]
  usersList.value.list.splice(index, 1, {
    ...item,
    ...params
  })
}

// 删除一个或多个，一般真是接口，不做真删除
export const deleteUser = (params) => {
  params.userIds.forEach((id) => {
    const index = usersList.value.list.findIndex(u => Number(u.userId) === Number(id))
    usersList.value.list.splice(index, 1)
  })
}