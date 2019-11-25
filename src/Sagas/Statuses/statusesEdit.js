import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {statusesGetStart, statusesAddError, statusesAddErrorClear} from './../../Actions/statuses';
import mainStore from './../../forStartConstants';

const axiosStatusesEdit = (token, data) => {
	return axios({
				method: 'PUT',
				url: `http://${mainStore.API_URL}/statuses/`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				data,
			}
	)
};

function* sagaStatusesEdit(data) {
	try {
		yield axiosStatusesEdit(data.token, data.payload);
		yield put(statusesGetStart(data.token));
		data.closeFormEditAddStatus(data.payload.id, data.payload.name);
		data.editAddStatusError(data.payload.id);
	} catch (error) {
		const errorMessage = error.response.data.message;
		data.editAddStatusError(data.payload.id, errorMessage);
	}
}

export function* statusesEditSaga() {
	yield takeLatest('STATUSES_EDIT_START', sagaStatusesEdit)
}