import {combineReducers} from "redux";
import {authReducer} from './Auth/index';
import {cartridgesReducer} from './Cartridges/index';
import {statusesReducer} from './Statuses/index';

const appReducer = combineReducers({
  auth: authReducer,
  cartridges: cartridgesReducer,
  statuses: statusesReducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};