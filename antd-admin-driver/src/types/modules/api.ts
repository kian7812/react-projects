import { PageParams } from './common'

// ✅使用命名空间

export namespace ILogin {
  export interface params {
    userName: string;
    userPwd: string;
  }
}

export namespace IUser {

  // 接口入参类型，并不是具体某个接口，可参考这种定义方式
  export interface Params extends PageParams {
    userId?: number;
    userName?: string
    state?: number
  }

  // 接口返回Item类型，并不是具体某个接口，可参考这种定义方式
  export interface UserInfo {
    _id: number;
    userId: number;
    userName: string;
    userEmail?: string;
    state?: number;
    mobile?: string;
    job?: string;
    role?: number;
    roleList?: string;
    createId?: number;
    deptId?: string;
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
