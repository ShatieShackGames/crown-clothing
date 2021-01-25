import React from "react";
import { connect } from 'react-redux';


import {addCartItem} from "../../redux/cart/cart.actions";

import {
    CollectionItemContainer,
    CollectionFooterContainer,
    CollectionItemName,
    CollectionItemPrice,
    CollectionItemImage, AddButton
} from "./collection-item.styles";

const CollectionItem = ({item, addCartItem}) => {
    const { name, imageUrl, price } = item;
    return (
        <CollectionItemContainer>
            <CollectionItemImage
                 style={{
                     backgroundImage: `url(${imageUrl})`
                 }}
            />
            <CollectionFooterContainer>
                <CollectionItemName>{name}</CollectionItemName>
                <CollectionItemPrice>${price}</CollectionItemPrice>
            </CollectionFooterContainer>
            <AddButton inverted onClick={() => addCartItem(item)}>Add to Cart</AddButton>
        </CollectionItemContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    addCartItem: item => dispatch(addCartItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);