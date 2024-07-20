import { useCatStore } from "../stores/catStore";


export function CatBox2() {

  // ✅这里只使用了bigCats，但当smallCats变化时，这个组件也会重新渲染
  // ✅为什么直接使用useStore()可能会造成不必要的re-render吗
  // ✅👍🏻因为直接解构是个语法糖，相当于先获取到整个state对象，然后再一个一个往外赋值。那你整个state都取出来了，里面元素变化了，自然state也变化，那就导致了重渲染。

  // const {
  //   cats: { bigCats }
  // } = useCatStore()

  // ✅selector 方式，可避免上述问题，
  // ✅selector 就是 callback 函数，接受states全部状态为参数，返回需要要的 state
  const bigCats = useCatStore((states) => states.cats.bigCats)
  // utils/createSelectors.ts


  return (
    <div className="box">
      <h1>Partial States from catStore</h1>
      <p>big cats: {bigCats}</p>
      <p>{Math.random()}</p>
    </div>
  )
}