import { defineMock } from 'vite-plugin-mock-dev-server'
import { users } from '../mock/shared/database/user'

import { deptList, createDept, editDept, deleteDept } from '../mock/shared/database/dept'
import { successWrap, noneUserWrap, noneTokenWrap } from '../mock/shared/utils/dataWrap'
import { MOCK_LOCAL_API } from './shared/utils/constants'

export default defineMock([
  // 部门列表
  {
    url: MOCK_LOCAL_API + '/dept/list',
    delay: 180,
    body({ body, query, params, headers }) {
      const authorization = headers.authorization?.toUpperCase()
      const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

      // 没做搜索
      if (user) {
        return successWrap(deptList.value.list)
      }

      return noneTokenWrap()
    }
  },
  // 创建
  {
    url: MOCK_LOCAL_API + '/dept/create',
    delay: 200,
    body({ body, query, params, headers }) {
      const authorization = headers.authorization?.toUpperCase()
      const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

      if (user) {
        createDept(body)
        return successWrap(true)
      }

      return noneTokenWrap()
    }
  },
  // 编辑
  {
    url: MOCK_LOCAL_API + '/dept/edit',
    delay: 200,
    body({ body, query, params, headers }) {
      const authorization = headers.authorization?.toUpperCase()
      const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

      if (user) {
        editDept(body)
        return successWrap(true)
      }

      return noneTokenWrap()
    }
  },
  // 删除
  {
    url: MOCK_LOCAL_API + '/dept/delete',
    delay: 200,
    body({ body, query, params, headers }) {
      const authorization = headers.authorization?.toUpperCase()
      const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

      if (user) {
        deleteDept(body)
        return successWrap(true)
      }

      return noneTokenWrap()
    }
  },

])


