import {
    takeLatest,
    put,
    all,
    call
} from 'redux-saga/effects';

import UserActionTypes from "./user.types";

import {
    auth,
    googleProvider,
    createUserProfileDocument, getCurrentuser
} from "../../firebase/firebase.utils";
import {
    signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess
} from "./user.actions";

/////////////////////////////////////////////
// Authentication Utility Functions       //
///////////////////////////////////////////
export function* getSnapshotFromUser(user, additionalData) {
    try {
        const userRef = yield call(
            createUserProfileDocument,
            user,
            additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signInFailure(error))
    }
}
/********************************************/

/////////////////////////////////////////////
// Sign In Saga Functions                 //
///////////////////////////////////////////
export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUser(user);
    } catch (error) {
        yield put(signInFailure(error))
    }
}



export function* emailSignInStart({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUser(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}
/********************************************/


/////////////////////////////////////////////
// Check User Authentication Status       //
///////////////////////////////////////////
export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentuser();
        if (!userAuth) {
            return
        }
        yield getSnapshotFromUser(userAuth);
    } catch (error) {
        yield put(signInSuccess(error))
    }
}
/********************************************/

/////////////////////////////////////////////
// Sign Out Saga Functions                //
///////////////////////////////////////////
export function* signOut() {
    yield console.log('Logging out ...');
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (err) {
        yield put(signOutFailure(err));
    }
}
/********************************************/


/////////////////////////////////////////////
// Sign Up Saga Functions                 //
///////////////////////////////////////////
export function* signUp({payload: {email, password, displayName}}) {
    try {
        console.log(`Receive sign up credentials: ${displayName}, ${email} ${password}`);
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: {displayName} }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}


export function* signInAfterSignUp({payload: {user, additionalData}}) {
    console.log('Logging in after sign up with user', user);
        console.log('Additional data: ', additionalData);
    yield getSnapshotFromUser(user, additionalData);
}
/********************************************/

/////////////////////////////////////////////
// Saga Listeners                         //
///////////////////////////////////////////

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, emailSignInStart);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

/********************************************/

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}