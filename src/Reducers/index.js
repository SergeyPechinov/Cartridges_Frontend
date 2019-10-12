import {combineReducers} from "redux";
import {authReducer} from './Auth';
import {cartridgesReducer} from './Cartridges';
import {statusesReducer} from './Statuses';
import {workersReducer} from "./Workers";

const appReducer = combineReducers({
  auth: authReducer,
  cartridges: cartridgesReducer,
  statuses: statusesReducer,
  workers: workersReducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};