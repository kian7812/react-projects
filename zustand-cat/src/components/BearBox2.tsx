import { useEffect, useState } from "react"
import { useBearStore } from "../stores/bearStore"
import { useFoodStore } from "../stores/foodStore2" // 2
import { shallow } from "zustand/shallow"


export function BearBox2() {
  const { bears, increasePopulation, removeAllBears } = useBearStore()

  const [bgColor, setBgColor] = useState<"lightgreen" | "lightpink" | undefined>(
    useFoodStore.getState().fish > 5 ? "lightgreen" : "lightpink"
  )

  useEffect(() => {

    const unsub = useFoodStore.subscribe(
      (state) => state.fish,
      (fish, prevFish) => {
        if (fish > 5 && prevFish <= 5) {
          setBgColor("lightgreen")
        } else if (fish <= 5 && prevFish > 5) {
          setBgColor("lightpink")
        }
      },
      {
        equalityFn: shallow,
        fireImmediately: true,
      }
    )

    return unsub
  }, [])

  return (
    <div className="box"
      // style={{ backgroundColor: fish > 5 ? "lightgreen" : "lightpink" }}
      style={{ backgroundColor: bgColor }}
    >
      <h1>Bear Box2</h1>
      <p>bears: {bears}</p>
      <p>{Math.random()}</p>
      <div>
        <button onClick={increasePopulation}>add bear</button>
        <button onClick={removeAllBears}>remove all bear</button>
        <button onClick={useBearStore.persist.clearStorage}>clear storage</button>
      </div>
    </div>
  )
}