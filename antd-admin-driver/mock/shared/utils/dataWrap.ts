export function successWrap(data) {
  return {
    code: 0,
    message: 'success',
    result: data,
  }
}

export function errorWrap(message?) {
  return {
    code: 401,
    message: message,
    result: null,
  }
}