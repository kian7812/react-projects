import { defineMock } from 'vite-plugin-mock-dev-server'
import { users } from './shared/database/user'

import { menuList, createMenu, editMenu, deleteMenu } from './shared/database/menu'
import { successWrap, noneUserWrap, noneTokenWrap } from './shared/utils/dataWrap'
import { MOCK_LOCAL_API } from './shared/utils/constants'

export default defineMock([
  // 列表
  {
    url: MOCK_LOCAL_API + '/menu/list',
    delay: 180,
    body({ body, query, params, headers }) {
      const authorization = headers.authorization?.toUpperCase()
      const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

      // 没做搜索
      if (user) {
        return successWrap(menuList.value.list)
      }

      return noneTokenWrap()
    }
  },
  // 创建
  {
    url: MOCK_LOCAL_API + '/menu/create',
    delay: 200,
    body({ body, query, params, headers }) {
      const authorization = headers.authorization?.toUpperCase()
      const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

      if (user) {
        createMenu(body)
        return successWrap(true)
      }

      return noneTokenWrap()
    }
  },
  // 编辑
  {
    url: MOCK_LOCAL_API + '/menu/edit',
    delay: 200,
    body({ body, query, params, headers }) {
      const authorization = headers.authorization?.toUpperCase()
      const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

      if (user) {
        editMenu(body)
        return successWrap(true)
      }

      return noneTokenWrap()
    }
  },
  // 删除
  {
    url: MOCK_LOCAL_API + '/menu/delete',
    delay: 200,
    body({ body, query, params, headers }) {
      const authorization = headers.authorization?.toUpperCase()
      const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

      if (user) {
        deleteMenu(body)
        return successWrap(true)
      }

      return noneTokenWrap()
    }
  },

])


