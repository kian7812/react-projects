import { successWrap, noneUserWrap, noneTokenWrap } from './dataWrap'
import { users } from '../database/user'

export function validateAuth(headers, successCallback) {
  const authorization = headers.authorization?.toUpperCase()
  const user = users.value.find(u => authorization?.includes(u.name.toUpperCase()))

  if (user) {
    const data = successCallback()
    return successWrap(data)
  }

  return noneTokenWrap()
}