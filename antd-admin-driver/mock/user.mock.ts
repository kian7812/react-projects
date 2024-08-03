import { defineMock } from 'vite-plugin-mock-dev-server'
import { users } from '../mock/shared/database/user'
import { successWrap, errorWrap } from '../mock/shared/utils/dataWrap'
import { MOCK_LOCAL_API, MOCK_TOKEN } from './shared/utils/constants'

export default defineMock({
  url: MOCK_LOCAL_API + '/users/login',
  body({ body, query, params }) {
    const { userName, userPwd } = body

    const user = users.value.find(u => u.name.toUpperCase() === userName.toUpperCase())

    if (user) {
      return successWrap(MOCK_TOKEN)
    }

    return errorWrap('没有此用户')
  }
})


