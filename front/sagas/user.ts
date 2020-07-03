import { all, fork, takeEvery, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import {
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SignupRequestAction,
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LoginRequestAction,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
    BOOKMARK_POST_REQUEST, BOOKMARK_POST_SUCCESS, BOOKMARK_POST_FAILURE, BookmarkPostRequestAction,
    UNBOOKMARK_POST_REQUEST, UNBOOKMARK_POST_SUCCESS, UNBOOKMARK_POST_FAILURE, UnbookmarkPostRequestAction,
} from '../reducers/user';
import { SignupData, LoginData } from '../util/user';

function signupAPI(signupData: SignupData) {
    return axios.post('/user', signupData);
}

function* signup(action: SignupRequestAction) {
    try {
        yield call(signupAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e.response?.data,
        });
    }
}

function* watchSignup() {
    yield takeEvery(SIGN_UP_REQUEST, signup);
}

function loginAPI(loginData: LoginData) {
    return axios.post('/user/login', loginData, {
        withCredentials: true,
    });
}

function* login(action: LoginRequestAction) {
    try {
        const result = yield call(loginAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
            error: e.response?.data,
        });
    }
}

function* watchLogin() {
    yield takeEvery(LOG_IN_REQUEST, login);
}

function logoutAPI() {
    return axios.post('/user/logout', {}, {
        withCredentials: true,
    });
}

function* logout() {
    try {
        yield call(logoutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error: e,
        });
    }
}

function* watchLogout() {
    yield takeEvery(LOG_OUT_REQUEST, logout);
}

function loadUserAPI() {
    return axios.get('/user/login', {
        withCredentials: true,
    });
}

function* loadUser() {
    try {
        const result = yield call(loadUserAPI);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e,
        });
    }
}

function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function bookmarkPostAPI(uuid: string) {
    return axios.post(`/user/bookmark/${uuid}`, {}, {
        withCredentials: true,
    });
}

function* bookmarkPost(action: BookmarkPostRequestAction) {
    try {
        const result = yield call(bookmarkPostAPI, action.data);
        yield put({
            type: BOOKMARK_POST_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: BOOKMARK_POST_FAILURE,
            error: e,
        });
    }
}

function* watchBookmarkPost() {
    yield takeEvery(BOOKMARK_POST_REQUEST, bookmarkPost);
}

function unbookmarkPostAPI(uuid: string) {
    return axios.delete(`/user/bookmark/${uuid}`, {
        withCredentials: true,
    });
}

function* unbookmarkPost(action: UnbookmarkPostRequestAction) {
    try {
        const result = yield call(unbookmarkPostAPI, action.data);
        yield put({
            type: UNBOOKMARK_POST_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: UNBOOKMARK_POST_FAILURE,
            error: e,
        });
    }
}

function* watchUnbookmarkPost() {
    yield takeEvery(UNBOOKMARK_POST_REQUEST, unbookmarkPost);
}

export default function* userSaga() {
    yield all([
        fork(watchSignup),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchLoadUser),
        fork(watchBookmarkPost),
        fork(watchUnbookmarkPost),
    ]);
}