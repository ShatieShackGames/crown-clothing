import {createSelector} from "reselect";

const selectCart = state => state.cart;

// Makes cartItems memoizable
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (acc, cartItem) => acc + cartItem.quantity,
            0
        )
)

export const selectCartPriceTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedPrice, cartItem) => accumulatedPrice + (cartItem.quantity * cartItem.price), 0.0)
)