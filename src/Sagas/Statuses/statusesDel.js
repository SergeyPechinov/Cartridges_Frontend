import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {statusesGetStart} from './../../Actions/statuses';
import mainStore from './../../forStartConstants';

const axiosStatusesDel = (token, data) => {
	return axios({
				method: 'DELETE',
				url: `http://${mainStore.API_URL}/statuses/`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				data,
			}
	)
};

function* sagaStatusesDel(data) {
	try {
		yield axiosStatusesDel(data.token, {id: data.payload});
		yield put(statusesGetStart(data.token));
	} catch (error) {
		const errorMessages = error.response.data.message;
		alert(errorMessages);
	}
}

export function* statusesDelSaga() {
	yield takeLatest('STATUSES_DEL_START', sagaStatusesDel)
}