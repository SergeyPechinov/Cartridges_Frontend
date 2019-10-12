import {call} from 'redux-saga/effects';
import {cartridgesGetSaga} from './cartridgesGet';

export default [call(cartridgesGetSaga)];