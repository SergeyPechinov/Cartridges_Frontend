import {call} from 'redux-saga/effects';
import {statusesGetSaga} from './statusesGet';
import {statusesAddSaga} from './statusesAdd';
import {statusesEditSaga} from './statusesEdit';
import {statusesDelSaga} from './statusesDel';

export default [
		call(statusesGetSaga),
		call(statusesAddSaga),
		call(statusesEditSaga),
		call(statusesDelSaga),
];