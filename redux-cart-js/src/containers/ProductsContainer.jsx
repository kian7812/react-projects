import { connect } from "react-redux";
import Products from "../components/Products";
import { getAllProducts, addToCart } from '../action'

function mapStateToProps(state) {
  return {
    products: state.products.all
  }
}

// 复杂写法（也能生效）
// function mapDispatchToProps(dispatch) {
//   console.log(1, dispatch);
//   return {
//     getAllProducts() {
//       // 调用 dispatch，发起请求，拿到数据
//       dispatch(getAllProducts())

//       // dispatch({
//       //   type: 'RECIVE_PRODUCETS',
//       //   products: ['1', '2']
//       // })
//     }
//   }
// }

// 简写，直接映射 action creator
const mapDispatchToProps = {
  handleGetAllProducts: getAllProducts,
  handleAddToCart: addToCart
}

const ProductsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)

export default ProductsContainer