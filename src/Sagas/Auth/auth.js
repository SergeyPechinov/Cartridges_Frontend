import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {userLogin, userAuthLoading, userLoginOrRegError} from "../../Actions/auth";
import mainStore from './../../forStartConstants';

const authUser = (user) => {

  return axios({
        method: 'POST',
        url: `http://${mainStore.API_URL}/auth/login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: user,
      }
  );
};

export function* sagaUserLogin(data) {
  yield put(userAuthLoading(true));

  try {
    const
        user = {
          username: data.payload.username,
          password: data.payload.password,
        };

    const
        response = yield call(() => {
          return authUser(user);
        }),
        tokenAuth = response.data.token;
    yield put(userLogin(response.data.username, tokenAuth));
    yield localStorage.setItem('tokenAuth', tokenAuth);
  } catch (e) {
    yield put(userLoginOrRegError(e.response.data.message));
  }

  yield put(userAuthLoading(false));
}

export function* userAuth() {
  yield takeLatest('USER_LOGIN_START', sagaUserLogin);
}