import request from "@/utils/request";
import { ILogin } from '@/types/modules/user'

export default {
  login(params: ILogin.params) {
    return request.post('/users/login', params)
  }
}