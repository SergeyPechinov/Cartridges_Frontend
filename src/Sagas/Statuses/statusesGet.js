import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {statusesGet} from './../../Actions/statuses';
import mainStore from './../../forStartConstants';

const axiosStatusesGet = (token) => {
  return axios({
        method: 'POST',
        url: `http://${mainStore.API_URL}/statuses/`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
  )
};

function* sagaStatusesGet(data) {
  let result = null;
  yield axiosStatusesGet(data.payload).then((res) => { result = res.data});
  yield put(statusesGet(result));
}

export function* statusesGetSaga() {
  yield takeLatest('STATUSES_GET_START', sagaStatusesGet)
}