import { defineMockData } from 'vite-plugin-mock-dev-server'

const dayTimestamp = 1000 * 60 * 60 * 24
const monthTimestamp = dayTimestamp * 30
let now = Date.now()
function generateCreateTime() {
  now = now - (monthTimestamp * 2)
  return now
}

// id 递加 每次新增加
let idNumber = 5

export const menuList = defineMockData('menuList', {
  page: {},
  list: [
    {
      _id: 1,
      parentId: '',
      menuName: '工作台',
      icon: 'DesktopOutlined',
      menuType: 1,
      menuState: 1,
      menuCode: '',
      path: '/dashboard',
      component: 'Dashboard',
      orderBy: 1,
      createTime: generateCreateTime(),
      buttons: [
        {
          _id: 211,
          parentId: 1,
          menuName: '查看',
          icon: '',
          menuType: 2, // 按钮
          menuState: 1,
          menuCode: 'dashboard@query',
          path: '',
          component: '',
          orderBy: 1,
          createTime: generateCreateTime(),
          buttons: null,
          children: null
        }
      ],
      children: null
    },
    {
      _id: 2,
      parentId: '',
      menuName: '系统管理',
      icon: 'SettingOutlined',
      menuType: 1,
      menuState: 1,
      menuCode: '',
      path: '',
      component: '',
      orderBy: 2,
      createTime: generateCreateTime(),
      buttons: [],
      children: [
        {
          _id: 3,
          parentId: 2,
          menuName: '用户管理',
          icon: 'TeamOutlined',
          menuType: 1,
          menuState: 1,
          menuCode: '',
          path: '/userList',
          component: 'UserList',
          orderBy: 1,
          createTime: generateCreateTime(),
          buttons: null,
          children: null,
        },
        {
          _id: 4,
          parentId: 2,
          menuName: '菜单管理',
          icon: 'MenuOutlined',
          menuType: 1,
          menuState: 1,
          menuCode: '',
          path: '/menuList',
          component: 'MenuList',
          orderBy: 2,
          createTime: generateCreateTime(),
          buttons: [],
        },
        {
          _id: 5,
          parentId: 2,
          menuName: '角色管理',
          icon: 'TrademarkCircleOutlined',
          menuType: 1,
          menuState: 1,
          menuCode: '',
          path: '/roleList',
          component: 'RoleList',
          orderBy: 3,
          createTime: generateCreateTime(),
          buttons: [],
        },
        {
          _id: 6,
          parentId: 2,
          menuName: '部门管理',
          icon: 'ProfileOutlined',
          menuType: 1,
          menuState: 1,
          menuCode: '',
          path: '/deptList',
          component: 'DeptList',
          orderBy: 4,
          createTime: generateCreateTime(),
          buttons: [],
        },
      ]
    },
  ]
})

/**
 * 没做的功能: 
 * 创建、编辑、删除 都没做子集遍历
 * 停用
 * 排序
 * 查询
 */

// 创建
export const createMenu = (params) => {
  const item = {
    _id: 1,
    parentId: '',
    menuName: '',
    icon: '',
    menuType: 1,
    menuState: 1,
    menuCode: '',
    path: '',
    component: '',
    orderBy: 1,
    createTime: generateCreateTime(),
    buttons: null,
    children: null
  }

  idNumber = idNumber + 1
  const _id = idNumber

  const newItem = {
    ...item,
    ...params,
    _id,
  }

  menuList.value.list.push(newItem)
}

// 编辑
export const editMenu = (params) => {
  const index = menuList.value.list.findIndex(u => Number(u._id) === Number(params._id))
  const item = menuList.value.list[index]
  menuList.value.list.splice(index, 1, {
    ...item,
    ...params
  })
}

// 删除
export const deleteMenu = (params) => {
  const index = menuList.value.list.findIndex(u => Number(u._id) === Number(params._id))
  menuList.value.list.splice(index, 1)
}