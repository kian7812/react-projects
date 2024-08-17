import { defineMock } from 'vite-plugin-mock-dev-server'
import { driverList } from './shared/database/driver'
import { MOCK_LOCAL_API } from './shared/utils/constants'
import { validateAuth } from './shared/utils/middleware'

export default defineMock([
  // 列表
  {
    url: MOCK_LOCAL_API + '/order/driver/list',
    delay: 180,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        return {
          list: driverList.value.list
        }
      })
    }
  }
])


