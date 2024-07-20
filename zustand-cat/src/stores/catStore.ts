import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from '../utils/createSelectors';
import { devtools, persist } from 'zustand/middleware';

type TCatStoreState = {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  increaseBigCats: () => void;
  increaseSmallCats: () => void;
  summary: () => void;
}

// ✅使用 get 获取 state 
export const useCatStore = createSelectors(
  create<TCatStoreState>()(
    immer(
      // ✅ devtools 放到 immer 里面
      devtools(
        // ✅ persist 放到 devtools 里面
        persist(
          (set, get) => ({
            cats: {
              bigCats: 0,
              smallCats: 0
            },
            increaseBigCats: () =>
              set((state) => {
                state.cats.bigCats++
              }),
            increaseSmallCats: () =>
              set((state) => {
                state.cats.smallCats++
              }),
            summary: () => {
              const total = get().cats.bigCats + get().cats.smallCats
              return `There are ${total} cats in total`
            }
          }),
          {
            name: "CAT_STORE"
          }
        ),
        {
          enabled: true,
          name: "cat store"
        }
      )
    )
  )
)

// 使用👆🏻中间immer 可变更状态数据方式
// increaseBigCats: () => set((state) => ({
//   cats: {
//     ...state.cats,
//     bigCats: state.cats.bigCats + 1
//   }
// })),

// increaseSmallCats: () => set((state) => ({
//   cats: {
//     ...state.cats,
//     smallCats: state.cats.smallCats + 1
//   }
// }))