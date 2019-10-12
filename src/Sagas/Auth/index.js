import {call} from 'redux-saga/effects';
import {userAuth} from './auth';
import {userReg} from './reg';
import {logout} from './logout';

export default [call(userAuth), call(userReg), call(logout)];