import React from 'react';
import {connect} from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import {ReactComponent as Logo} from '../../../src/assets/dlc-circle-logo.svg'
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from "./header.styles";
import {signOutStart} from "../../redux/user/user.actions";


const Header = ({currentUser, hidden, signOut}) => (
    <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo" />
            </LogoContainer>

        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/contact" >
                CONTACT
            </OptionLink>
            {
                currentUser
                    ? <OptionLink as='div' onClick={() => signOut()}>SIGN OUT</OptionLink>
                    : <OptionLink to="/signIn" >
                        SIGN IN
                    </OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null :
            <CartDropdown/>}
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);