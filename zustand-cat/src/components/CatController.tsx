import { shallow } from "zustand/shallow"
import { useCatStore } from "../stores/catStore"

export function CatController() {

  // 这俩都是 action
  // const increaseBigCats = useCatStore.use.increaseBigCats()
  // const increaseSmallCats = useCatStore.use.increaseSmallCats()

  // ✅到底selector是如何比较的
  // 应该是比较的selector返回的那个值，参考👇🏻shallow那个栗子。
  // const increaseBigCats = useCatStore((state => state.increaseBigCats))
  // const increaseSmallCats = useCatStore((state => state.increaseSmallCats))

  // 第四弹一次性选项多个状态 -- shallow 例子
  const { increaseBigCats, increaseSmallCats } = useCatStore((states) => ({
    increaseBigCats: states.increaseBigCats,
    increaseSmallCats: states.increaseSmallCats,
  }),
    shallow
  )

  // ✅shallow 应用于selector返回状态的比较
  // 因为每次返回的都是新的object对象，
  // shallow比较新旧object对象第一层值是否一样，
  // 如果一样那它就认为这俩object是相等的，返回的那俩action也一样。
  // 如果不一样store就认为这两个object是不等的，返回那俩action也就不一样
  // 可通过添加/去掉shallow参数做验证。
  // shallow 只比较第一层，还可以自己写比较函数

  // ✅也可以返回数组，非常灵活，就是js写法
  // const [increaseBigCats, increaseSmallCats] = useCatStore((states) => ([
  //   states.increaseBigCats,
  //   states.increaseSmallCats,
  // ]),
  //   shallow
  // )


  return <div className="box">
    <h1>CatController</h1>
    <p>{Math.random()}</p>
    <div>
      <button onClick={increaseBigCats}>add big cats</button>
      <button onClick={increaseSmallCats}>add small cats</button>
    </div>
  </div>
}