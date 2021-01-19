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
    signInFailure, signInSuccess, signOutFailure, signOutSuccess
} from "./user.actions";

/////////////////////////////////////////////
// Authentication Utility Functions       //
///////////////////////////////////////////
export function* getSnapshotFromUser(user) {
    try {
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        yield put(signInFailure(error))
    }
}
/////////////////////////////////////////////

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

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* emailSignInStart({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUser(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, emailSignInStart);
}
/////////////////////////////////////////////


/////////////////////////////////////////////
// Check If User Authentication Status    //
///////////////////////////////////////////
export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentuser();
        if (!userAuth) { return }
        yield getSnapshotFromUser(userAuth);
    } catch (error) {
        yield put(signInSuccess(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}
////////////////////////////////////////////

/////////////////////////////////////////////
// Sign Out Saga Functions                //
///////////////////////////////////////////
export function* signOutStart() {
    yield console.log('Logging out ...');
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (err) {
        yield put(signOutFailure(err));
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutStart);
}
/////////////////////////////////////////////

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart)
    ])
}