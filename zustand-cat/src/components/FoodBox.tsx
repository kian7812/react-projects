import { useFoodStore } from "../stores/foodStore"



export default function FoodBox() {
  const { fish, addOneFish, removeOneFish, removeAllFish } = useFoodStore();

  // ✅ getState non-reactive 示例 🌰
  // const fish = useFoodStore.getState().fish // non-reactive
  // const addOneFish = useFoodStore(state => state.addOneFish) // 配合
  // const removeOneFish = useFoodStore(state => state.removeOneFish) // 配合
  // const removeAllFish = useFoodStore(state => state.removeAllFish) // 配合

  // ✅ setState 写法
  const add5Fish = () => {
    useFoodStore.setState((state) => ({
      fish: state.fish + 5
    }))
  }

  return (
    <div className="box">
      <h1>Food Box</h1>
      <p>fish: {fish}</p>
      <div>
        <button onClick={addOneFish}>add one fish</button>
        <button onClick={removeOneFish}>remove one fish</button>
        <button onClick={removeAllFish}>remove all fish</button>
        <button onClick={add5Fish}>add 5 fish</button>
      </div>
    </div>
  )

}