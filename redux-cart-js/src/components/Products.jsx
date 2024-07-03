import { useEffect } from "react"

export default function Products({ products, handleGetAllProducts, handleAddToCart, }) {
  useEffect(() => {
    setTimeout(() => {
      handleGetAllProducts()
    }, 1000);
  }, [])

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(item => (
          <li key={item.id}>
            <span>{item.title} - {item.price} * {item.inventory}</span>
            <br />
            <button
              disabled={!item.inventory}
              onClick={() => handleAddToCart(item)}>
              {item.inventory ? 'Add to cart' : 'Sold out'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
