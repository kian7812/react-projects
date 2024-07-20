import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";


type TFoodStoreState = {
  fish: number;
  addOneFish: () => void;
  removeOneFish: () => void;
  removeAllFish: () => void;
}

export const useFoodStore = create<TFoodStoreState>()(
  devtools(
    // ✅ subscribeWithSelector
    subscribeWithSelector(
      persist(
        (set) => ({
          fish: 0,
          addOneFish: () => set((state) => ({ fish: state.fish + 1 })),
          removeOneFish: () => {
            set((state) => ({ fish: state.fish - 1 }))
          },
          removeAllFish: () => {
            set({ fish: 0 })
          },
        }),
        {
          name: "FOOD_STORE"
        }
      )
    ),
    {
      name: "food store"
    }
  )
)