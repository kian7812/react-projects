import { MutableRefObject } from "react"

export type IAction = 'create' | 'edit' | 'delete'

export interface IModalProp<T = any> {
  mRef: MutableRefObject<
    { open: (type: IAction, data?: T) => void } // ref 对外的方法
    | undefined
  >
  update: () => void
}

export interface IModalProp2<T = any> {
  visible: boolean
  getModalParams: () => { type: IAction, data?: T }
  update: () => void
}

export interface IModalDetailProp {
  mRef: MutableRefObject<{ open: (id: string) => void } | undefined>
}