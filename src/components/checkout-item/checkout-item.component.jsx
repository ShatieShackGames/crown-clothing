import React from "react";
import { connect } from 'react-redux';
import {clearCartItem, removeCartItem, addCartItem} from "../../redux/cart/cart.actions";

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, clearCartItem, removeCartItem , addCartItem }) => {
    const { imageUrl, name, price, quantity } = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='checkout item'/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeCartItem(cartItem)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addCartItem(cartItem)}>&#10095;</div>
            </span>
            <span className='price'>${price}</span>
            <div className='remove-button' onClick={() => clearCartItem(cartItem)}>&#10005;</div>

        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    clearCartItem: cartItem => dispatch(clearCartItem(cartItem)),
    removeCartItem: cartItem => dispatch(removeCartItem(cartItem)),
    addCartItem: cartItem => dispatch(addCartItem(cartItem))
})
export default connect(null, mapDispatchToProps)(CheckoutItem);