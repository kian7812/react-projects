import { defineMock } from 'vite-plugin-mock-dev-server'
import { users } from '../mock/shared/database/user'
import { successWrap, noneUserWrap, noneTokenWrap } from '../mock/shared/utils/dataWrap'
import { MOCK_LOCAL_API } from './shared/utils/constants'

export default defineMock([
  {
    url: MOCK_LOCAL_API + '/users/login',
    delay: 200,
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
    delay: 200,
    body({ body, query, headers }) {
      const authorization = headers.authorization?.toUpperCase()
      const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

      if (user) {
        return successWrap({
          userName: user.name
        })
      }

      return noneTokenWrap()
    }
  },
])


