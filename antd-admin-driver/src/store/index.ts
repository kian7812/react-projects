import { create } from "zustand";
import { IUser } from '@/types/modules/user'

interface IState {
  token: string;
  userInfo: IUser.UserInfo;
  updateUserInfo: (userInfo: IUser.UserInfo) => any
}

export const useUserInfoStore = create<IState>((set) => ({
  token: '',
  userInfo: {
    userName: '',
    userEmail: ''
  },
  updateUserInfo: (userInfo: IUser.UserInfo) => {
    return set({ userInfo })
  }
}))
