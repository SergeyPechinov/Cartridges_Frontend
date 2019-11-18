import {call} from 'redux-saga/effects';
import {statusesGetSaga} from './statusesGet';
import {statusesAddSaga} from './statusesAdd';

export default [
		call(statusesGetSaga),
		call(statusesAddSaga)];