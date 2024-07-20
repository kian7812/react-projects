import {
  useFoodStore,
  addOneFish,
  removeOneFish,
  removeAllFish
} from "../stores/foodStore2"



export default function FoodBox2() {
  const fish = useFoodStore(state => state.fish)

  //  setState 写法
  const add5Fish = () => {
    useFoodStore.setState((state) => ({
      fish: state.fish + 5
    }))
  }

  return (
    <div className="box">
      <h1>Food Box2</h1>
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