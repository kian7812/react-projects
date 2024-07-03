import { useState } from 'react'
import CartContainer from './containers/CartContainer'
import ProductsContainer from './containers/ProductsContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Shopping Cart Example</h1>
      <hr />
      <ProductsContainer />
      <hr />
      <CartContainer />
    </div>
  )
}

export default App
