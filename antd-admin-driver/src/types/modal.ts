import { MutableRefObject } from "react"
import { IUser } from "./modules/api"

export type IAction = 'create' | 'edit' | 'delete'

export interface IModalProp {
  mRef: MutableRefObject<
    { open: (type: IAction, data?: IUser.UserInfo) => void } // ref 对外的方法
    | undefined
  >
  update: () => void
}