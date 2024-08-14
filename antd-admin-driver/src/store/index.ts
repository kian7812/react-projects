import { create } from "zustand";
import { IUser } from '@/types/modules/api'

interface IState {
  token: string;
  userInfo: IUser.UserInfo;
  updateUserInfo: (userInfo: IUser.UserInfo) => any
}

export const useUserInfoStore = create<IState>((set) => ({
  token: '',
  userInfo: {
    _id: 0,
    userId: 0,
    userName: '',
    userEmail: '',
    state: 0,
    mobile: '',
    job: '',
    role: 0,
    roleList: '',
    createId: 0,
    deptId: '',
    deptName: '',
    userImg: '',
  },
  updateUserInfo: (userInfo: IUser.UserInfo) => {
    return set({ userInfo })
  }
}))
