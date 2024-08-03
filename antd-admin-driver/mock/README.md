# 官方文档参考章节：

## 使用 defineMockData:

- https://vite-plugin-mock-dev-server.netlify.app/guide/shared-data
- https://vite-plugin-mock-dev-server.netlify.app/guide/define-mock-data

## body response validator

https://vite-plugin-mock-dev-server.netlify.app/guide/mock-config

```js
// ✅body 输入参数请求体，返回给客户端响应体
// Type: ResponseBody | ((request: RequestOptions) => ResponseBody | Promise<ResponseBody>)
```

## 同接口入参不同响应不同

https://vite-plugin-mock-dev-server.netlify.app/guide/file-management

```js
export default defineMock([
  {
    url: 'api/goods/list',
    validator: {
      query: { page: 1 }
    },
    body: { page: 1, result: [] }
  },
  {
    url: 'api/goods/list',
    validator: {
      query: { page: 2 }
    },
    body: { page: 2, result: [] }
  }
]);
```
