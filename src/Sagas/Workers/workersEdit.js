import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {workersGetStart} from './../../Actions/workers';
import mainStore from './../../forStartConstants';

const axiosWorkersEdit = (token, data) => {
	return axios({
				method: 'PUT',
				url: `http://${mainStore.API_URL}/workers/`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				data,
			}
	)
};

function* sagaWorkersEdit(data) {
	axiosWorkersEdit(data.token, data.payload);
	yield put(workersGetStart(data.token));
}

export function* workersEditSaga() {
	yield takeLatest('WORKERS_EDIT_START', sagaWorkersEdit)
}