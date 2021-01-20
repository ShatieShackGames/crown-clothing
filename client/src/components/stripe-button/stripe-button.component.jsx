import React from "react";
import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I7UICHjiZfAa9i3sjoLX7PEXqKk3vfPLbuErDtUhl2WbHUw47GvG9NoHblKvbyJmWwm3pQVTKACZC8Cs7yxNFIu00YKcflcyF';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successful!');
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert(
                'There was an issue with your payment.  Please be sure to use the provided credit card information'
            )
        })
    }

    return (
        <StripeCheckout
            label='YOU BUY NOW!!!'
            name='De La Cross Fit Apparel'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            panelLabel='YOU BUY NOW!!'
            amount={priceForStripe}
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}


export default StripeCheckoutButton;