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
				data,
			}
	)
};

function* sagaWorkersAdd(data) {
	try {
		yield axiosWorkersAdd(data.token, data.payload);
		data.openCloseEditAddBlockWorker(0);
		data.addDelErrorAll(0);
		yield put(workersGetStart(data.token));
	} catch (error) {
		const errorMessages = error.response.data.message;

		if (typeof errorMessages === "string") {
			data.addCommonError(0, errorMessages);
		} else if (typeof errorMessages === "object") {
			data.addDelErrorAll(0, errorMessages);
		}
	}
}

export function* workersAddSaga() {
	yield takeLatest('WORKERS_ADD_START', sagaWorkersAdd)
}