import {call} from 'redux-saga/effects';
import {workersGetSaga} from './workersGet';
import {workersAddSaga} from "./workersAdd";
import {workersDelSaga} from "./workersDel";
import {workersEditSaga} from "./workersEdit";

export default [
	call(workersGetSaga),
	call(workersAddSaga),
	call(workersDelSaga),
	call(workersEditSaga)];