import request from "@/utils/request";
import { IOrder } from '@/types/modules/api'
import { ResultData } from "@/types/modules/common";

export default {
  //【订单管理】

  // 列表
  getOrderList(params?: IOrder.Params) { // 入参类型 和 👇🏻返回结果类型
    return request.get<ResultData<IOrder.OrderItem>>('/order/list', params)
  },
  // 城市列表
  getCityList() {
    // 返回类型
    return request.get<IOrder.DictItem[]>('/order/cityList')
  },
  // 车型列表
  getVehicleList() {
    return request.get<IOrder.DictItem[]>('/order/vehicleList')
  },
  // 订单详情
  getOrderDetail(params: { orderId: string }) {
    return request.get<IOrder.OrderItem>(`/order/detail`, params)
  },
  // 创建
  createOrder(params: IOrder.CreateParams) {
    return request.post('/order/create', params)
  },
  // // 编辑
  // editOrder(params: IOrder.EditParams) {
  //   return request.post('/order/edit', params)
  // },
  // 删除
  deleteOrder(params: { orderId: string }) {
    return request.post('/order/delete', params)
  },
  // 导出
  exportData(params: IOrder.SearchParams) {
    return request.downloadFile('/order/export', params)
  },
}