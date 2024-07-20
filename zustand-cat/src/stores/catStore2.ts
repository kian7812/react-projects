import { create, StateCreator } from 'zustand'
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

const createCatSlice: StateCreator<
  TCatStoreState,
  // 这些都是中间件type 文档：https://docs.pmnd.rs/zustand/guides/typescript
  [
    ["zustand/immer", never],
    ["zustand/devtools", unknown],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", unknown]
  ]
> = (set, get) => ({
  cats: {
    bigCats: 0,
    smallCats: 0
  },
  increaseBigCats: () => set((state) => {
    state.cats.bigCats++;
  }),
  increaseSmallCats: () => set((state) => {
    state.cats.smallCats++;
  }),
  summary: () => {
    const total = get().cats.bigCats + get().cats.smallCats;
    return `There are ${total} cats in total`;
  }
});
export const useCatStore = createSelectors(
  create<TCatStoreState>()(
    immer(
      devtools(
        persist(
          createCatSlice,
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
