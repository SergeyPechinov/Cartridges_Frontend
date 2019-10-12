import {call} from 'redux-saga/effects';
import {statusesGetSaga} from './statusesGet';

export default [call(statusesGetSaga)];