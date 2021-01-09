import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I7UICHjiZfAa9i3sjoLX7PEXqKk3vfPLbuErDtUhl2WbHUw47GvG9NoHblKvbyJmWwm3pQVTKACZC8Cs7yxNFIu00YKcflcyF';

    const onToken = token => {
        console.log(token);
        alert('Payment successful!');
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