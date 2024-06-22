import { useState } from "react";
import Button, {
  ButtonA,
  ButtonB,
  ButtonC,
  ButtonE,
  ButtonF,
  ButtonG,
} from "./components/Button";

function App() {

  const [, setCountG] = useState(0)

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-4">
      <Button
        backgroundColor="red"
        fontSize={30}
        textColor="purple"
        padding={[5, 10, 20, 50]}
      />

      <ButtonA
        style={{
          backgroundColor: "purple",
          fontSize: 24,
          textColor: "white"
        }}
      />

      <ButtonB
        style={{
          backgroundColor: "green",
          fontSize: 24,
          color: "blue",
          padding: "1rem 2em",
          borderRadius: 8,
          borderColor: "transparent",

        }}
      />

      <ButtonC
        borderRadius={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      />

      <ButtonE>
        ButtonE
      </ButtonE>

      <ButtonF>
        <span>ButtonF</span>
      </ButtonF>
    </main>
  )
}

export default App
