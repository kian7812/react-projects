import { create } from "zustand";
import { IUser } from '@/types/modules/api'
import storage from "@/utils/storage";

interface IState {
  token: string;
  collapsed: boolean;
  isDark: boolean;
  userInfo: IUser.UserInfo;
  updateUserInfo: (userInfo: IUser.UserInfo) => any
  updateToken: (token: string) => any
  updateTheme: (isDark: boolean) => any
}

export const useUserInfoStore = create<IState>((set) => ({
  token: '',
  collapsed: false,
  isDark: storage.get('isDark') || false,
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
  },
  updateToken: token => set({ token }),
  updateTheme: isDark => set({ isDark }),
}))
