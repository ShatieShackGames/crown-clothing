import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import {auth} from "../../firebase/firebase.utils";

import {ReactComponent as Logo} from '../../../src/assets/crown.svg'
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";


import './header.styles.scss';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link to="/">
            <Logo className='logo'/>
        </Link>

        <div className='options'>
            <Link to="/shop" className='option'>
                SHOP
            </Link>
            <Link to="/contact" className='option'>
                CONTACT
            </Link>
            {
                currentUser
                    ? <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                    : <Link to="/signIn" className='option'>
                        SIGN IN
                    </Link>
            }
            <CartIcon />
        </div>
        {
            hidden ? null :
            <CartDropdown/>}
    </div>
)

const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);