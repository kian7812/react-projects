import * as shop from '../api/shop'
import * as types from '../constants/ActionTypes'

// 同步 action creator
export const reciveProducts = (products) => {
  return {
    type: types.RECIVE_PRODUCETS,
    products
  }
}

export const addToCartCreator = (product) => {
  return {
    type: types.ADD_TO_CART,
    product
  }
}

// 异步 action 
export const getAllProducts = () => {
  return (dispatch) => {
    // console.log(dispatch); // (action, ...args) => dispatch(action, ...args)
    shop.getAllProducts((products) => {
      dispatch(reciveProducts(products))
    })
  }
}

// 可不用这个异步 action 直接使用 上面的 addToCartCreator，因为这个没异步就是同步操作
export const addToCart = (product) => {
  return (dispatch) => {
    // 1. 让商品库存 - 1
    // 2. 往购物车的 items 添加商品
    dispatch(addToCartCreator(product))
  }
}

// action creator
export const setCheckoutStatus = (status) => {
  return {
    type: types.SET_CHECKOUT_STATUS,
    status
  }
}

export const setCartItems = (items) => {
  return {
    type: types.SET_ITEMS,
    items
  }
}

export const checkout = (products) => {
  return (dispatch) => {
    // console.log(products)
    // 1. 备份购物车数据
    const savedCartProducts = [...products]
    // 2. 清空结算状态
    dispatch(setCheckoutStatus(null))
    // 3. 清空购物车
    dispatch(setCartItems([]))
    // 4. 执行结算操作
    shop.buyProducts(
      products, 
      () => {
        // 5. 成功，设置结算状态成功
        dispatch(setCheckoutStatus('successful'))
      }, 
      () => {
        // 6. 失败，设置结算状态失败， 还原购物车数据
        dispatch(setCheckoutStatus('failed'))
        dispatch(setCartItems(savedCartProducts))
      }, 
    )
  }
}