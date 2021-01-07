import { CartActionTypes } from "./cart.types";

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
})

export const addCartItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})

export const removeCartItem = cartItem => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: cartItem
})

export const clearCartItem = cartItem => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: cartItem
})