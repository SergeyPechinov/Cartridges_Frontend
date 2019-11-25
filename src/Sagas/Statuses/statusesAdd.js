import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {statusesGetStart} from './../../Actions/statuses';
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
		yield axiosStatusesAdd(data.token, data.payload);
		yield put(statusesGetStart(data.token));
		data.editAddStatusError(0, '');
		data.closeEditAddBlock(0, '');
	} catch (error) {
		const errorMessage = error.response.data.message;
		data.editAddStatusError(0, errorMessage);
	}
}

export function* statusesAddSaga() {
	yield takeLatest('STATUSES_ADD_START', sagaStatusesAdd)
}