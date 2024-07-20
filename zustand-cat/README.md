
# React Zustand 状态管理教程

- https://www.bilibili.com/video/BV1Tr4y1Z7h7
- 非常👍🏻，解释了使用场景中重复渲染的问题。
- 最常用的最佳实践多降到了👍🏻


## 章节
- react zustand 状态管理系统详解教程，第一弹，基本使用
- 第二弹 get, set 和immer middleware
- 第三弹 我们为什么要用selector以及如何自动产生selector
- 第四弹 如何选择多个状态，以及什么是shallow
- 第五弹 - 调试工具 devtools
- 第六弹 - 保存状态
- 第七弹 - subscribe以及subscribeWithSelector中间件的用法
- 第8弹 - 如何用getState, setState在store外控制状态，如果把action从store中分离。
- 第9弹 - typescript 建议，react zustand的一些使用建议和经验和大家分享一下 https://docs.pmnd.rs/zustand/guides/typescript
  - Why zustand typescript implementation is so ugly
    - https://blog.axlight.com/posts/why-zustand-typescript-implementation-is-so-ugly/  
  - middlewareTypes.test.tsx:
    - https://github.com/pmndrs/zustand/blob/main/tests/middlewareTypes.test.tsx


## 备注
- zustand和Redux是一个派的，比Redux简单且异步、中间件都有。
- 不用 context Provider 包裹
- 可直接异步方法 async
- set
  - set本身就是reducer，更改状态
  - 这只是简写(state) => set({...})，并不是要return
- immer 中间件，安装 immer 从 zustand 导入
- get() 方法
- 为什么要用 selector 以及如何自动产生 selector
- shallow 比较第一层值是否相等。 对象的第一层；数组的第一层；都可以。
- devtools 有多个 instance，选择 Autoselect instances ✅，也可给devtool取名字，方便查看。
    - 中间件顺序在 immer 里面
- persist 默认是localStorage 文档：https://docs.pmnd.rs/zustand/integrations/persisting-store-data
  - 中间件顺序 在 devtools 里面
  - 必选第二个参数name，是Storage的key值
  - storage 可配置
  - partialize 可选择部分状态，还可以排除状态
  - clearStorage
      - 清除完立刻刷新，state也会跟随storage重置；
      - 如果清除完，不刷新，则state不会重置
      - 如果想重置，还是直接重置state就行，然后storage也会跟随重置。不要用clearStorage。
- Selector 返回在的状态是 reactive 的，每次状态改变后都要重渲染。
- Subscribe 订阅全局状态但不渲染
  - 订阅全局状态，如果状态改变了，你会知道，但不需要重新渲染。
  - 可以在组件里使用，状态改变，并不会引起重新渲染；
  - 也可以在组件外使用。
  - 类似事件监听，并不会引起重新渲染，相当于副作用
- subscribeWithSelector 中间件
  - 中间件的顺序 devtools 和 persist 中间
  - 第一个参数就是selector，返回的状态给到第二参数listener监听
  - 第三个参数 options
    - fireImmediately 监听函数listener是否立刻执行，是否在第一次运行时执行，默认false
- getState 和 setState
  - 可组件里和js里；
  - setState
    - 就相当于set方法
  - getState 返回的状态是 non-reactive 
    - 意思当state状态改变了，不会引起组件重新渲染；但状态是改变的，只是不会引起组件渲染。
    - ✅场景：主要抽离 action 即 state里的function函数。 也是库作者和教程作者都推荐的写法，文档：https://docs.pmnd.rs/zustand/guides/practice-with-no-store-actions
      - 示例在 foodStore2.ts 中
- 把 StateCreate 从 store 里 extract 出来
  - catStore2.ts

- 🍅Slices Pattern 库作者和教程作者都不推荐使用 https://docs.pmnd.rs/zustand/guides/slices-pattern
  - 视频作者说，会有typescript问题；
  - 库作者说，zustand 不必要用 slice pattern；
  - ✅用getState和setState可以在store外控制状态，这样就可以随心所欲的控制几个store的状态，因此就没必要用 slice pattern。

- ctrl + shift + right + right


