import { defineMock } from 'vite-plugin-mock-dev-server'
import { orderList, vehicleList, cityList, createOrder, orderDetail, deleteOrder } from './shared/database/order'
import { MOCK_LOCAL_API } from './shared/utils/constants'
import { validateAuth } from './shared/utils/middleware'

export default defineMock([
  // 列表
  {
    url: MOCK_LOCAL_API + '/order/list',
    delay: 180,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        const { pageNum = 1, pageSize = 10 } = query
        orderList.value.page.pageNum = Number(pageNum)
        orderList.value.page.pageSize = Number(pageSize)
        orderList.value.page.total = orderList.value.list.length

        // 不做分页边界判断了，直接返回页的数据 0-9 10-19
        const start = (pageNum - 1) * pageSize
        const end = pageNum * pageSize - 1
        const list = orderList.value.list.slice(start, end)

        return {
          list: list,
          page: orderList.value.page
        }
      })
    }
  },
  // 车型列表
  {
    url: MOCK_LOCAL_API + '/order/vehicleList',
    delay: 200,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        return vehicleList.value.list
      })
    }
  },
  // 城市列表
  {
    url: MOCK_LOCAL_API + '/order/cityList',
    delay: 200,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        return cityList.value.list
      })
    }
  },
  // 创建
  {
    url: MOCK_LOCAL_API + '/order/create',
    delay: 200,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        createOrder(body)
        return true
      })
    }
  },
  // 详情
  {
    url: MOCK_LOCAL_API + '/order/detail',
    delay: 200,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        return orderDetail(query)
      })
    }
  },
  // 删除
  {
    url: MOCK_LOCAL_API + '/order/delete',
    delay: 200,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        deleteOrder(body)
        return true
      })
    }
  },
])


