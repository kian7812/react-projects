import * as types from '../constants/ActionTypes'

const initialState = {
  // 存储商品id、数量
  // {id: '商品id', quantity: '数量‘}
  items: [],
  // null  'successful' 'failed'
  checkoutStatus: null
}

// 把数组/对象复杂数据类型，继续拆分reducer✅
const items = (state = initialState.items, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      // 判断购物车中是否已存在该商品
      // 如果已存在，则让购物车商品数量 + 1
      // 如果不存在，则添加新的商品到购车车
      const productId = action.product.id
      const product = state.find(item => item.id === productId)
      // console.log(productId, product);

      if (product) {
        // 如果已存在
        product.quantity++
        return [...state]
      } else {
        // 如果不存在
        return [ ...state,{
          id: productId,
          quantity: 1
        }]
      }
    case types.SET_ITEMS: 
      return action.items
    default:
      return state;
  }
}


export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CHECKOUT_STATUS: 
      return {
        ...state,
        checkoutStatus: action.status
      }

    default: 
    return {
      items: items(state.items, action),
      checkoutStatus: state.checkoutStatus
    }
  }
}