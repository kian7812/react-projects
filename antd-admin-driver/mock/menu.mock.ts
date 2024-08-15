import { defineMock } from 'vite-plugin-mock-dev-server'
import { users } from './shared/database/user'

import { menuList, createMenu, editMenu, deleteMenu } from './shared/database/menu'
import { successWrap, noneUserWrap, noneTokenWrap } from './shared/utils/dataWrap'
import { MOCK_LOCAL_API } from './shared/utils/constants'
import { validateAuth } from './shared/utils/middleware'

export default defineMock([
  // 列表
  {
    url: MOCK_LOCAL_API + '/menu/list',
    delay: 180,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        return menuList.value.list
      })
    }
  },
  // 创建
  {
    url: MOCK_LOCAL_API + '/menu/create',
    delay: 200,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        createMenu(body)
        return true
      })
    }
  },
  // 编辑
  {
    url: MOCK_LOCAL_API + '/menu/edit',
    delay: 200,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        editMenu(body)
        return true
      })
    }
  },
  // 删除
  {
    url: MOCK_LOCAL_API + '/menu/delete',
    delay: 200,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        deleteMenu(body)
        return true
      })
    }
  },
])


