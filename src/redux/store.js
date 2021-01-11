import {createStore, applyMiddleware} from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import thunk from 'redux-thunk';

import rootReducer from "./root-reducer";

const middlewares = [thunk];

// We only want to log in the development build of our app
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);