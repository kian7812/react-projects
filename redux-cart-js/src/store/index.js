import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {thunk} from 'redux-thunk'
import products from '../reducers/products'
import cart from '../reducers/cart'

const rootReducer = combineReducers({
  products,
  cart
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer, 
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store