// ✅使用命名空间

export namespace ILogin {
  export interface params {
    userName: string;
    userPwd: string;
  }
}

export namespace IUser {
  export interface UserInfo {
    _id?: string;
    userId?: number;
    userName: string;
    userEmail?: string;
    state?: number;
    role?: number;
    roleList?: string;
    createId?: number;
    deptId?: string;
    deptName?: string;
    userImg?: string;
  }
}
