import {call} from 'redux-saga/effects';
import {cartridgesGetSaga} from './cartridgesGet';
import {cartridgesAddSaga} from './cartridgesAdd';

export default [
		call(cartridgesGetSaga),
		call(cartridgesAddSaga),
];