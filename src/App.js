import React from 'react';
import {Route, Switch} from "react-router-dom";

import './App.css';

import Header from "./components/header/header.component";
import {Homepage} from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth} from "./firebase/firebase.utils";

const HatsPage = () => (
    <div>
        <h1>HATS PAGE</h1>
    </div>
)

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        }

        this.props = props;
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({currentUser: user});
            console.log(user);
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact={true} path='/' component={Homepage}/>
                    <Route path='/hats' component={HatsPage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route path='/signIn' component={SignInAndSignUpPage}/>
                </Switch>
            </div>
        )
    }
}

export default App;
