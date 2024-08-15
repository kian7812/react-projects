import { defineMock } from 'vite-plugin-mock-dev-server'
import { users } from './shared/database/user'

import { roleList, createRole, editRole, deleteRole } from './shared/database/role'
import { successWrap, noneUserWrap, noneTokenWrap } from './shared/utils/dataWrap'
import { MOCK_LOCAL_API } from './shared/utils/constants'
import { validateAuth } from './shared/utils/middleware'

export default defineMock([
  // 列表
  {
    url: MOCK_LOCAL_API + '/role/list',
    delay: 180,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        const { pageNum = 1, pageSize = 10 } = query
        roleList.value.page.pageNum = Number(pageNum)
        roleList.value.page.pageSize = Number(pageSize)
        roleList.value.page.total = roleList.value.list.length

        // 不做分页边界判断了，直接返回页的数据 0-9 10-19
        const start = (pageNum - 1) * pageSize
        const end = pageNum * pageSize - 1
        const list = roleList.value.list.slice(start, end)

        return {
          list: list,
          page: roleList.value.page
        }
      })
    }
  },
  // 创建
  {
    url: MOCK_LOCAL_API + '/role/create',
    delay: 200,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        createRole(body)
        return true
      })
    }
  },
  // 编辑
  {
    url: MOCK_LOCAL_API + '/role/edit',
    delay: 200,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        editRole(body)
        return true
      })
    }
  },
  // 设置权限
  {
    url: MOCK_LOCAL_API + '/role/update/permission',
    delay: 200,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        editRole(body)
        return true
      })
    }
  },
  // 删除
  {
    url: MOCK_LOCAL_API + '/role/delete',
    delay: 200,
    body({ body, query, params, headers }) {
      return validateAuth(headers, () => {
        deleteRole(body)
        return true
      })
    }
  },
])


