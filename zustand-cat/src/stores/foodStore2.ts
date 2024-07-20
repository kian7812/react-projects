import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";


// type TFoodStoreState = {
//   fish: number;
// }

const initialFoodValue = {
  fish: 0
}

// ✅类型里只有简单的状态了，可直接使用 typeof
export const useFoodStore = create<typeof initialFoodValue>()(
  devtools(
    subscribeWithSelector(
      persist(
        () => (initialFoodValue),
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

export const addOneFish = () => {
  useFoodStore.setState((state) => ({ fish: state.fish + 1 }))
}
export const removeOneFish = () => {
  useFoodStore.setState((state) => ({ fish: state.fish - 1 }))
}
export const removeAllFish = () => {
  useFoodStore.setState({ fish: 0 })
}