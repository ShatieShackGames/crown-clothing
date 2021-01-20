import React from 'react';

import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import './App.css';

import Header from "./components/header/header.component";
import {Homepage} from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import {selectCurrentUser} from "./redux/user/user.selectors";
import {checkUserSession} from "./redux/user/user.actions";
import {useEffect} from "react";

const HatsPage = () => (
    <div>
        <h1>HATS PAGE</h1>
    </div>
)

const App = ({checkUserSession, currentUser}) => {

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession])


    return (
        <div>
            <Header/>
            <Switch>
                <Route exact={true} path='/' component={Homepage}/>
                <Route path='/hats' component={HatsPage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route exact path='/signIn'
                       render={() => currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}/>
                <Route exact path='/checkout' component={CheckoutPage}/>
            </Switch>
        </div>
    )

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
