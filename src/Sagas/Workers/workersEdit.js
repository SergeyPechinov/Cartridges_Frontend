import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {workersGetStart} from './../../Actions/workers';
import mainStore from './../../forStartConstants';

const axiosWorkersEdit = (token, data) => {
	return axios({
				method: 'PUT',
				url: `http://${mainStore.API_URL}/workers`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				data,
			}
	)
};

function* sagaWorkersEdit(data) {
	const id = data.payload.id;
	try {
		yield axiosWorkersEdit(data.token, data.payload);
		yield put(workersGetStart(data.token));
		data.openCloseEditAddBlockWorker(id);
		data.addDelErrorAll(id);
	} catch (error) {
		const errorMessages = error.response.data.message;

		if (typeof errorMessages === "string") {
			data.addCommonError(id, errorMessages);
		} else if (typeof errorMessages === "object") {
			data.addDelErrorAll(id, errorMessages);
		}
	}
}

export function* workersEditSaga() {
	yield takeLatest('WORKERS_EDIT_START', sagaWorkersEdit)
}