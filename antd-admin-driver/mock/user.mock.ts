import { defineMock } from 'vite-plugin-mock-dev-server'
import { users, usersList } from '../mock/shared/database/user'
import { successWrap, noneUserWrap, noneTokenWrap } from '../mock/shared/utils/dataWrap'
import { MOCK_LOCAL_API } from './shared/utils/constants'

export default defineMock([
  {
    url: MOCK_LOCAL_API + '/users/login',
    delay: 180,
    body({ body, query, params, headers }) {
      const { userName, userPwd } = body

      const user = users.value.find(u => u.name.toUpperCase() === userName.toUpperCase())

      if (user) {
        return successWrap(user.name) // user name 做为 Token
      }

      return noneUserWrap()
    }
  },
  {
    url: MOCK_LOCAL_API + '/users/getUserInfo',
    delay: 180,
    body({ body, query, headers }) {
      const authorization = headers.authorization?.toUpperCase()
      const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

      if (user) {
        return successWrap({
          userId: 1001,
          userName: user.name,
          userEmail: '123@xxx.com',
          state: 1,
          mobile: '12333212321',
          job: '前端开发',
          role: 0,
          roleList: '1',
          createId: 1,
          deptId: '1',
          deptName: '研发',
          userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        })
      }

      return noneTokenWrap()
    }
  },
  {
    url: MOCK_LOCAL_API + '/order/dashboard/getReportData',
    delay: 180,
    body({ body, query, params, headers }) {
      const authorization = headers.authorization?.toUpperCase()
      const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

      if (user) {
        return successWrap({
          driverCount: 2786000,
          totalMoney: 39582000,
          orderCount: 1238000,
          cityNum: 80,
        })
      }

      return noneTokenWrap()
    }
  },
  {
    url: MOCK_LOCAL_API + '/users/list',
    delay: 180,
    body({ body, query, params, headers }) {
      const authorization = headers.authorization?.toUpperCase()
      const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

      if (user) {
        const { pageNum = 1, pageSize = 10 } = query
        usersList.value.page.pageNum = Number(pageNum)
        usersList.value.page.pageSize = Number(pageSize)
        usersList.value.page.total = usersList.value.list.length

        // 不做分页边界判断了，直接返回页的数据 0-9 10-19
        const start = (pageNum - 1) * pageSize
        const end = pageNum * pageSize - 1
        const list = usersList.value.list.slice(start, end)

        return successWrap({
          list: list,
          page: usersList.value.page
        })
      }

      return noneTokenWrap()
    }
  },
])


