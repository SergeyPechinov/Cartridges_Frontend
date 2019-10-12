import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {userAuthLoading, userLoginStart, userLoginOrRegError} from "../../Actions/auth";
import mainStore from './../../forStartConstants';

function regPost(user) {
  return axios({
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `http://${mainStore.API_URL}/auth/reg`,
        data: user,
      }
  );
}

export function* sagaUserReg(data) {
  yield put(userAuthLoading(true));
  try {

    const user = {
      username: data.payload.username,
      password: data.payload.password,
    };

    yield call(() => {
      return regPost(user)
    });
    yield put(userLoginStart(user.username, user.password));
  } catch (e) {
    yield put(userLoginOrRegError(e.response.data.message));
  }
  yield put(userAuthLoading(false));
}

export function* userReg() {
  yield takeLatest('USER_REG_START', sagaUserReg);
}
