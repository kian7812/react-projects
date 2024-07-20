import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type TBearStoreState = {
  bears: number;
  color: string;
  size: string;
  increasePopulation: () => void;
  removeAllBears: () => void;
  reset: () => void;
  // getOwner: () => Promise<string>
}

// ✅不要忘记 加括号<>()  在文档：https://docs.pmnd.rs/zustand/guides/typescript
export const useBearStore = create<TBearStoreState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        color: "red",
        size: "big",
        // ✅zustand 帮你自动合并第一层 state，下面写法就不用了；当然只有第一层。
        // increasePopulation: () => set((state) => ({ 
        //   ...state,
        //   bears: state.bears + 1 
        // })),
        increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
        removeAllBears: () => set({ bears: 0 }),
        reset: () => set(() => ({
          bears: 0,
          color: "red",
          size: "big",
        }))
        // getOwner: async () => { 
        //   return ''
        // }
      }),
      {
        name: "BEAR_STORE", // ✅ 必选 Storage 的 key
        storage: createJSONStorage(() => localStorage), // ✅ 默认是localStorage 可配置sessionStorage等
        // partialize: (state) => ({ bears: state.bears }) // ✅ 只保存bears
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => !['size', 'color'].includes(key)), // ✅排除部分状态
          ),
      }
    ),
    {
      enabled: true, // ✅ 生产环境可false
      name: "bear store"
    }
  )
)