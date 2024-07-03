import { connect } from "react-redux";
import Cart from "../components/Cart";
import { checkout } from '../action/index'

const getCartProducts = (state) => {
  // console.log(22, state); // 每次state变化都执行✅
  return state.cart.items.map(cartItem => {
    const prod = state.products.all.find(prodItem => prodItem.id === cartItem.id)
    return {
      id: prod.id,
      title: prod.title,
      price: prod.price,
      quantity: cartItem.quantity,
    }
  })
}

// 每次state变化都执行✅ 
const getTotalPrice = (state) => {
  return getCartProducts(state).reduce((total, prod) => {
    return total + prod.price * prod.quantity
  }, 0)
}

function mapStateToProps(state) {
  // console.log(11, state); // 每次state变化都执行✅
  return {
    cartProducts: getCartProducts(state),
    totalPrice: getTotalPrice(state),
    checkoutStatus: state.cart.checkoutStatus
  }
}

// function mapDispatchToProps(dispatch) {
//   return {}
// }

// 简单方式

const mapDispatchToProps = {
  checkout
}


const CartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)

export default CartContainer