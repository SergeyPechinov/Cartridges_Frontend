import {call} from 'redux-saga/effects';
import {workersGetSaga} from './workersGet';
import {workersAddSaga} from "./workersAdd";
import {workersDelSaga} from "./workersDel";

export default [
	call(workersGetSaga),
	call(workersAddSaga),
	call(workersDelSaga)];