import { BearBox } from "./components/BearBox"
import { BearBox2 } from "./components/BearBox2"
import { CatBox } from "./components/CatBox"
import { CatBox2 } from "./components/CatBox2"
import { CatController } from "./components/CatController"
import FoodBox from "./components/FoodBox"
import FoodBox2 from "./components/FoodBox2"

function App() {
  return (
    <div className="container">
      <h1>Zustand Cat</h1>
      <div>
        <BearBox />
        <FoodBox />
      </div>
      <div>
        <BearBox2 />
        <FoodBox2 />
      </div>
      <div>
        <CatBox />
        <CatBox2 />
        <CatController />
      </div>
    </div>
  )
}

export default App
