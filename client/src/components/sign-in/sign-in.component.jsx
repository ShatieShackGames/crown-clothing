import React, {useState} from "react";
import { connect } from 'react-redux';


import './sign-in.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {emailSignInStart, googleSignInStart} from "../../redux/user/user.actions";

const SignIn = ({googleSignInStart, emailSignInStart}) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: ''});

    const handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = userCredentials;
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name]: value});
    }
    const { email, password } = userCredentials;

    return (
        <div className='sign-in'>
            <h2 className="title">I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    label="Email"
                    value={email}
                    handleChange={handleChange}
                    required/>

                <FormInput
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    handleChange={handleChange}
                    required/>

                <div className='buttons'>
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn={true}>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    )

}


const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);