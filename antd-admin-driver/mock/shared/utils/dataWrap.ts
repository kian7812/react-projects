export function successWrap(data) {
  return {
    code: 0,
    message: 'success',
    data: data,
  }
}

export function noneUserWrap(message?) {
  return {
    code: 401,
    message: message || '没有此用户',
    data: null,
  }
}

export function noneTokenWrap(message?) {
  return {
    code: 500001,
    message: message || 'token 失效',
    data: null,
  }
}