import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {cartridgesGet} from './../../Actions/cartridges';
import mainStore from './../../forStartConstants';

const axiosCartridgesGet = (token) => {
  return axios({
        method: 'GET',
        url: `http://${mainStore.API_URL}/cartridges/`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
  )
};

function* sagaCartridgesGet(data) {
  let result = null;
  yield axiosCartridgesGet(data.payload).then((res) => { result = res.data});
  yield put(cartridgesGet(result));
}

export function* cartridgesGetSaga() {
  yield takeLatest('CARTRIDGES_GET_START', sagaCartridgesGet)
}