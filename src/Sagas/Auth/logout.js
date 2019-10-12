import {takeLatest, put} from 'redux-saga/effects';
import {userLogout} from "../../Actions/auth";

function* sagaUserLogout() {
  yield localStorage.clear();
  yield put(userLogout());
}

export function* logout() {
  yield takeLatest('USER_LOGOUT_START', sagaUserLogout)
}