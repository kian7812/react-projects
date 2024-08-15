import { PageParams } from './common'

// ✅使用命名空间
// Tip✅ 定义列表类型时，直接定义Item就行，Item[]

export namespace ILogin {
  export interface params {
    userName: string;
    userPwd: string;
  }
}

// ✅字段都以mock后端数据为准

// 用户管理
export namespace IUser {
  // 接口入参类型，并不是具体某个接口，可参考这种定义方式
  export interface Params extends PageParams {
    userId?: number;
    userName?: string
    state?: number
  }
  // 接口返回Item类型，并不是具体某个接口，可参考这种定义方式
  export interface UserInfo {
    userId: number;
    userName: string;
    userEmail?: string;
    state?: number;
    mobile?: string;
    job?: string;
    role?: number;
    roleList?: string;
    createId?: number;
    deptId?: string; // 部门id
    deptName?: string; // 部门
    userImg?: string;
  }
  // 创建user接口
  export interface CreateParams {
    userName: string;
    userEmail: string;
    mobile?: string;
    deptId: string;
    job?: string;
    state?: number;
    roleList: string[];
    userImg?: string;
  }
  // 编辑用户
  export interface EditParams extends CreateParams {
    userId: number;
  }
}


// /order/dashboard/getReportData
export namespace IDashBoard {
  export interface reportData {
    driverCount?: number;
    totalMoney?: number;
    orderCount: number;
    cityNum?: number;
  }

  export interface LineData {
    label: string[]
    order: number[]
    money: number[]
  }

  export interface PieData {
    value: number
    name: string
  }

  export interface RadarData {
    indicator: Array<{ name: string; max: number }>
    data: {
      name: string
      value: number[]
    }
  }
}

// 部门管理
export namespace IDept {
  export interface Params {
    deptName?: string
  }
  export interface DeptItem {
    _id: string;
    parentId?: number
    createTime: string
    updateTime: string
    deptName: string;
    userName: string
    children: DeptItem[] // 直接使用✅
  }

  // 创建
  export interface CreateParams {
    parentId?: number
    deptName: string
    userName: string
  }
  // 编辑
  export interface EditParams extends CreateParams {
    _id: string
  }
  // 删除
  export interface DeleteParams {
    _id: string
  }
}

// 菜单
export namespace IMenu {
  export interface Params {
    menuName: string
    menuState: number
  }
  // 创建
  export interface CreateParams {
    menuName: string // 菜单名称
    icon?: string // 菜单图标
    menuType: number // 1: 菜单 2: 按钮 3: 页面
    menuState: number // 1:正常 2: 停用
    menuCode?: string // 按钮权限标识，只有类型2按钮有权限标识，标记权限：查看、新增、编辑、删除、批量删除
    parentId?: number // 父级菜单id
    path?: string // 菜单路径
    component?: string // 组件名称
    orderBy: number // 排序
  }
  /**
   * Item 说明
   * 有 buttons 且 有 path 说明是末及菜单了
   */
  export interface MenuItem extends CreateParams {
    _id: string;
    createTime: string
    buttons?: MenuItem[]
    children?: MenuItem[]
    key: string // 只用于角色TreeData
  }

  // 编辑
  export interface EditParams extends CreateParams {
    _id: string
  }
  // 删除
  export interface DeleteParams {
    _id: string
  }
}



// 角色
export namespace IRole {
  // 查询
  export interface Params extends PageParams {
    roleName?: string
  }
  // 创建
  export interface CreateParams {
    roleName?: string
    remark?: string
  }
  // Item
  export interface RoleItem extends CreateParams {
    _id: string;
    createTime: string
    updateTime: string
    permissionList: {
      checkedKeys: string[]
      halfCheckedKeys: string[]
    }
  }
  // 编辑
  export interface EditParams extends CreateParams {
    _id: string
  }
  // 删除
  export interface DeleteParams {
    _id: string
  }
  // Permission
  export interface Permission {
    _id: string;
    permissionList: {
      // 用于Tree回显，选中的都是最末端，不包含父级的，在Tree组件里，所有子集全选父级自动勾选
      // 默认末级都是按钮类型了，根据按钮类型做判断，严谨吗，如果没有查看、操作编辑呢
      checkedKeys: string[]
      // 用于菜单列表，父级菜单
      halfCheckedKeys: string[]
      //  角色 checkedKeys、halfCheckedKeys 和 菜单 _id 一样 
    }
  }
}
