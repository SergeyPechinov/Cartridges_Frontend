import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {statusesGetStart, statusesAddError, statusesAddErrorClear} from './../../Actions/statuses';
import mainStore from './../../forStartConstants';

const axiosStatusesAdd = (token, data) => {
	return axios({
				method: 'POST',
				url: `http://${mainStore.API_URL}/statuses/`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				data,
			}
	)
};

function* sagaStatusesAdd(data) {
	try {
		yield axiosStatusesAdd(data.token, {nameStatus: data.payload});
		yield put(statusesGetStart(data.token));
		yield put(statusesAddErrorClear());
		data.closeFormAddStatus();
	} catch (error) {
		const errorMessage = error.response.data.message;
		yield put(statusesAddError(errorMessage));
	}
}

export function* statusesAddSaga() {
	yield takeLatest('STATUSES_ADD_START', sagaStatusesAdd)
}