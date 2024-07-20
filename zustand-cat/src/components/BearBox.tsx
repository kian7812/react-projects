import { useEffect, useState } from "react"
import { useBearStore } from "../stores/bearStore"
import { useFoodStore } from "../stores/foodStore"
import { shallow } from "zustand/shallow"


export function BearBox() {
  // const bears = useBearStore((state) => state.bears)
  // const increasePopulation = useBearStore((state) => state.increasePopulation)
  // const removeAllBears = useBearStore((state) => state.removeAllBears)

  // 可以解构
  // ✅但是会引起不必要的重新渲染，意思只要useBearStore里的state包括函数和变量有了变化都会引起该组件重新渲染
  const { bears, increasePopulation, removeAllBears } = useBearStore()


  // ✅fish重渲染
  // 只要fish改变就会重新渲染；随机数会一直改变
  // const fish = useFoodStore(state => state.fish)

  // 只有bgColor改变时，组件才会重新渲染
  // 🌰 subscribe
  // const [bgColor, setBgColor] = useState<"lightgreen" | "lightpink">("lightpink") 
  // 🌰 fireImmediately 演示subscribeWithSelector的fireImmediately为true作用
  // const [bgColor, setBgColor] = useState<"lightgreen" | "lightpink" | undefined>()
  // 🌰 getState 给 bgColor 初始值
  const [bgColor, setBgColor] = useState<"lightgreen" | "lightpink" | undefined>(
    useFoodStore.getState().fish > 5 ? "lightgreen" : "lightpink"
  )
  // ✅ 用 Subscribe 解决重新渲染问题 
  // 类似事件监听，并不会引起重新渲染，相当于副作用
  // unsub 取消订阅，给到useEffect清除副作用。
  useEffect(() => {
    // 🌰 subscribe
    // const unsub = useFoodStore.subscribe((state, prevState) => {
    //   if (state.fish > 5 && prevState.fish <= 5) {
    //     setBgColor("lightgreen")
    //   } else if (state.fish <= 5 && prevState.fish > 5) {
    //     setBgColor("lightpink")
    //   }
    // })

    // ✅ subscribeWithSelector 中间件写法
    // 第一个参数就是selector，返回的状态给到第二参数listener监听
    // 第三个参数 options
    const unsub = useFoodStore.subscribe(
      (state) => state.fish,
      (fish, prevFish) => {
        // 这里场景是首次立刻执行fish和preFish都为0，fireImmediately为true时立刻执行，
        // 🌰 fireImmediately
        // if (fish === prevFish) {
        //   if (fish <= 5) {
        //     setBgColor("lightpink")
        //   } else {
        //     setBgColor("lightgreen")
        //   }
        // }

        if (fish > 5 && prevFish <= 5) {
          setBgColor("lightgreen")
        } else if (fish <= 5 && prevFish > 5) {
          setBgColor("lightpink")
        }
      },
      {
        equalityFn: shallow, // 判断新旧两个object第一层是否相等
        fireImmediately: true, // 监听函数listener是否立刻执行，是否在第一次运行时执行，默认false
      }
    )

    return unsub
  }, [])

  return (
    <div className="box"
      // style={{ backgroundColor: fish > 5 ? "lightgreen" : "lightpink" }}
      style={{ backgroundColor: bgColor }}
    >
      <h1>Bear Box</h1>
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