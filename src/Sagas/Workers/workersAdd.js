import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import mainStore from './../../forStartConstants';
import {workersGetStart} from "../../Actions/workers";

const axiosWorkersAdd = (token, data) => {
	return axios({
				method: 'POST',
				url: `http://${mainStore.API_URL}/workers`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				data: data,
			}
	)
};

function* sagaWorkersAdd(data) {
	try {
		yield axiosWorkersAdd(data.token, data.payload);
		data.openCloseEditAddBlockWorker(0);
		data.addDelErrorAll(0);
		yield put(workersGetStart(data.token));
	} catch(error) {
		const errorMessages = error.response.data.message;
		data.addDelErrorAll(0, errorMessages);
	}

	// console.log(data.token);
	// console.log(data.payload);
	// yield axiosWorkersAdd(data.token, data.payload);
	// yield put(workersGetStart(data.token));
}

export function* workersAddSaga() {
	yield takeLatest('WORKERS_ADD_START', sagaWorkersAdd)
}
