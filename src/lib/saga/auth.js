import { all, put, takeEvery, call } from 'redux-saga/effects'
import {
    INITIAL_TOKEN,
    SIGN_IN_REQUEST,
    SIGN_IN_RESPONSE_ERROR,
    SIGN_IN_RESPONSE_SUCCESS,
    SIGN_OUT,
    SIGN_OUT_SUCCESS
} from '../reducers'
import {signIn} from "../http/authRequest";
import {loadFromLocalStorage, clearFromLocalStorage, saveToLocalStorage} from "../storage/localStorageCustom";
import {authStorageKey} from "../config";

function* signInWorker(action) {
    try {
        const response = yield call(signIn, action.payload);
        if (response.data.role !== 'ROLE_ADMIN'){
            yield put(SIGN_IN_RESPONSE_ERROR())
        }else {
            yield call(saveToLocalStorage, response.data, authStorageKey);
            yield put(SIGN_IN_RESPONSE_SUCCESS(response.data))
        }
    } catch (e) {
        yield put(SIGN_IN_RESPONSE_ERROR())
    }
}

function* initialToken() {
    try {
        const data = yield call(loadFromLocalStorage, authStorageKey);
        if (data) {
            yield put(SIGN_IN_RESPONSE_SUCCESS(data));
        }
    } catch (e) {
    }
}

function* signOutWorker() {
    try {
        yield call(clearFromLocalStorage, authStorageKey);
        yield put(SIGN_OUT_SUCCESS())
    } catch (e) {
    }
}

export default function* authSaga() {
    yield all([
        yield takeEvery(SIGN_IN_REQUEST, signInWorker),
        yield takeEvery(INITIAL_TOKEN, initialToken),
        yield takeEvery(SIGN_OUT, signOutWorker)
    ])
}