import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./reducers";

import { composeWithDevTools } from "redux-devtools-extension";

// Add redux-thunk for side-effects
import thunkMiddleware from "redux-thunk";

// import { createLogger } from "redux-logger";

// Configuration for our persisted state
// Changing the key will remove *everything* persisted. Be careful!
const persistConfig = {
    key: "0.0.2",
    storage: AsyncStorage,
};

// Middleware for our Redux store
const middlewares = [thunkMiddleware];

// Our persisted storage, using AsyncStorage as our persisted storage area
const persistedReducer = persistReducer(persistConfig, rootReducer);
// The store we need to pass to redux as per any react-redux project
export const store = createStore(persistedReducer, undefined, composeWithDevTools(applyMiddleware(...middlewares)));

// Our persistor to pass to PersistGate for React
export const persistor = persistStore(store);
