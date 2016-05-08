'use strict';

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { LOGIN } from './../constants';
import * as actions from './../actions';
import * as api from './../api/authentication';


export function* loginAsync(action) {
    try {
        let result = yield call(api.authenticate, action.payload.email, action.payload.password);
        yield put(actions.loginSuccess(result.token, result.message));
    }
    catch(err) {
        yield put(actions.loginFailure(err.message));
    }
}

export function* watchLoginAsync() {
    yield* takeEvery(actions.Request, loginAsync);
}
