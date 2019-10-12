import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from "redux";
import {Provider} from 'react-redux';
import {rootReducer} from "./Reducers";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./Sagas";
import App from './App/';
import {BrowserRouter} from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
serviceWorker.unregister();
