import * as types from '../constants/ActionTypes'

const initialState = {
  all: []
}

// 把数组/对象复杂数据类型，继续拆分reducer✅
const all = (state = initialState.all, action) => {
  switch(action.type) {
    case types.RECIVE_PRODUCETS:
      return action.products
    case types.ADD_TO_CART:
      // console.log('ADD_TO_CART', action);
      // 让商品库存 - 1
      const productId = action.product.id
      const product = state.find(item => item.id === productId)
      product.inventory--
      return [...state]
    default: 
      return state
  }
}

export default (state = initialState, action) => {
  return {
    all: all(state.all, action)
  }
}