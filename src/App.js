import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import './App.css';

import Header from "./components/header/header.component";
import {Homepage} from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument } from "./firebase/firebase.utils";
import {setCurrentUser} from "./redux/user/user.actions";

const HatsPage = () => (
    <div>
        <h1>HATS PAGE</h1>
    </div>
)

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
            if (userAuth) {
               const userRef =  await createUserProfileDocument(userAuth);

               userRef.onSnapshot(snapshot => {
                   setCurrentUser({
                       id: snapshot.id,
                       ...snapshot.data()
                   })
               });
               console.log(userAuth);
            }

            setCurrentUser(userAuth);

        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact={true} path='/' component={Homepage}/>
                    <Route path='/hats' component={HatsPage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/signIn' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
