import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {workersGetStart} from './../../Actions/workers';
import mainStore from './../../forStartConstants';

const axiosWorkersDel = (token, data) => {
	return axios({
				method: 'DELETE',
				url: `http://${mainStore.API_URL}/workers/`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				data,
			}
	)
};

function* sagaWorkersDel(data) {
	try {
		yield axiosWorkersDel(data.token, {id: data.payload});
		yield put(workersGetStart(data.token));
	} catch (error) {
		const errorMessages = error.response.data.message;
		alert(errorMessages);
	}
}

export function* workersDelSaga() {
	yield takeLatest('WORKERS_DEL_START', sagaWorkersDel)
}