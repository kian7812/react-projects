import { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ; (store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}

// ✅可采用自动生成 Selectors 参考文档： Auto Generating Selectors https://docs.pmnd.rs/zustand/guides/auto-generating-selectors
// ✅在 store 上扩展了属性 use，包含了所有的 selectors
// ✅ selectors 都是 callback函数，所以在使用时需要执行()
// ✅只能自动生成第一层状态的 Selector。已确认。