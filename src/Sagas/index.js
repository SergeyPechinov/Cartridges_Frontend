import {all} from 'redux-saga/effects';
import auth from './Auth';
import cartridges from './Cartridges';
import statuses from './Statuses';
import workers from './Workers';

export function* rootSaga() {
  yield all([
      ...yield(auth),
      ...yield(cartridges),
      ...yield(statuses),
      ...yield(workers),
  ]);
}