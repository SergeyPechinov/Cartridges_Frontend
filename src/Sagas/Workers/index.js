import {call} from 'redux-saga/effects';
import {workersGetSaga} from './workersGet';

export default [call(workersGetSaga)];