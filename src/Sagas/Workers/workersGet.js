import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {workersGet} from './../../Actions/workers';
import mainStore from './../../forStartConstants';

const axiosWorkersGet = (token) => {
	return axios({
				method: 'GET',
				url: `http://${mainStore.API_URL}/workers/`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				}
			}
	)
};

function* sagaWorkersGet(data) {
	let result = null;
	yield axiosWorkersGet(data.payload).then((res) => { result = res.data});

	const resultLength = result.length;
	for (let i = 0; i < resultLength; i++) {
		result[i].listName = ` ${result[i].surname} ${result[i].name}`;
	}
	yield put(workersGet(result));
}

export function* workersGetSaga() {
	yield takeLatest('WORKERS_GET_START', sagaWorkersGet)
}