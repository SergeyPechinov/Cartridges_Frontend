import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import mainStore from './../../forStartConstants';

const axiosCartridgesAdd = (token, data) => {
	return axios({
				method: 'POST',
				url: `http://${mainStore.API_URL}/cartridges/`,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				data: data,
			}
	)
};

function* sagaCartridgesAdd(data) {
	try {
		yield axiosCartridgesAdd(data.token, data.payload);
		return true;
	} catch (error) {
		const errorMessages = error.response.data.message;
		if (typeof errorMessages === 'object') {
			data.addDelError(errorMessages);
		} else {
			document.getElementById('js-modal-cartridges-error-common').textContent = errorMessages;
		}
	}
}

export function* cartridgesAddSaga() {
	yield takeLatest('CARTRIDGES_ADD', sagaCartridgesAdd)
}