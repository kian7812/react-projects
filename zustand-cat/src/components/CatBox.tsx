import { useCatStore } from "../stores/catStore"

export function CatBox() {
  // const bigCats = useCatStore((state => state.cats.bigCats))
  // const smallCats = useCatStore((state => state.cats.smallCats))
  // const increaseBigCats = useCatStore((state => state.increaseBigCats))
  // const increaseSmallCats = useCatStore((state => state.increaseSmallCats))
  // const summary = useCatStore((state => state.summary))

  // ✅只适用于要使用全部store里的状态，如果只使用部分状态，则会引起不必要的重复渲染
  const {
    cats: { bigCats, smallCats },
    increaseBigCats,
    increaseSmallCats,
    summary
  } = useCatStore()

  console.log(summary());


  return <div className="box">
    <h1>Cat Box</h1>
    <p>big cats: {bigCats}</p>
    <p>small cats: {smallCats}</p>
    <p>{Math.random()}</p>
    <div>
      <button onClick={increaseBigCats}>add big cats</button>
      <button onClick={increaseSmallCats}>add small cats</button>
    </div>
  </div>
}