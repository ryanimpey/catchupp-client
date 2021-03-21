import { combineReducers } from "redux";
import userReducer from "./user";
import deviceReducer from "./device";

const rootReducer = combineReducers({
  account: userReducer,
  device: deviceReducer
});

export default rootReducer;
