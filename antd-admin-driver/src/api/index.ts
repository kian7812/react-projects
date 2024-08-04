import request from "@/utils/request";
import { ILogin, IUser } from '@/types/modules/user'

export default {
  login(params: ILogin.params) {
    return request.post('/users/login', params)
  },
  getUserInfo() {
    return request.get<IUser.IUserItem>('/users/getUserInfo')
  }
}