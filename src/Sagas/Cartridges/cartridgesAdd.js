import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import mainStore from './../../forStartConstants';

const axiosCartridgesAdd = (token, data) => {
	return axios({
				method: 'PUT',
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
	let result = null;
	yield axiosCartridgesAdd(data.token, data.payload).then((res) => {
		result = res.data
	});
}

export function* cartridgesAddSaga() {
	yield takeLatest('CARTRIDGES_ADD', sagaCartridgesAdd)
}