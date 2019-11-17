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
	yield axiosWorkersAdd(data.token, data.payload);
	yield put(workersGetStart(data.token));
}

export function* workersAddSaga() {
	yield takeLatest('WORKERS_ADD_START', sagaWorkersAdd)
}
