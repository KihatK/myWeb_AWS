import { all, fork, takeEvery, put, call, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
    GET_BCATEGORY_REQUEST, GET_BCATEGORY_SUCCESS, GET_BCATEGORY_FAILURE,
    ADD_BCATEGORY_REQUEST, ADD_BCATEGORY_SUCCESS, ADD_BCATEGORY_FAILURE, AddBcategoryRequestAction,
    ADD_SCATEGORY_REQUEST, ADD_SCATEGORY_SUCCESS, ADD_SCATEGORY_FAILURE, AddScategoryRequestAction,
    GET_SCATEGORYLIST_REQUEST, GET_SCATEGORYLIST_SUCCESS, GET_SCATEGORYLIST_FAILURE,
    CHANGE_BCATEGORY_ORDER_REQUEST, CHANGE_BCATEGORY_ORDER_SUCCESS, CHANGE_BCATEGORY_ORDER_FAILURE, ChangeBcategoryOrderRequestAction,
} from '../reducers/category';

function getBcategoryAPI() {
    return axios.get('/bcategory');
}

function* getBcategory() {
    try {
        const result = yield call(getBcategoryAPI);
        yield put({
            type: GET_BCATEGORY_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: GET_BCATEGORY_FAILURE,
            error: e,
        });
    }
}

function* watchGetBcategory() {
    yield takeLatest(GET_BCATEGORY_REQUEST, getBcategory);
}

function addBcategoryAPI(bcategoryData: string, bcategoryOrder: number) {
    return axios.post('/bcategory', { bcategoryData, bcategoryOrder }, {
        withCredentials: true,
    });
}

function* addBcategory(action: AddBcategoryRequestAction) {
    try {
        const result = yield call(addBcategoryAPI, action.data, action.order);
        yield put({
            type: ADD_BCATEGORY_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: ADD_BCATEGORY_FAILURE,
            error: e,
        });
    }
}

function* watchAddBcategory() {
    yield takeEvery(ADD_BCATEGORY_REQUEST, addBcategory);
}

function addScategoryAPI(scategoryData: string, bcategory: string, order: number) {
    return axios.post('/scategory', { scategoryData, bcategory, order }, {
        withCredentials: true,
    });
}

function* addScategory(action: AddScategoryRequestAction) {
    try {
        const result = yield call(addScategoryAPI, action.data, action.Bcategory, action.order);
        yield put({
            type: ADD_SCATEGORY_SUCCESS,
            data: result.data,
            Bcategory: action.Bcategory,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: ADD_SCATEGORY_FAILURE,
            error: e,
        });
    }
}

function* watchAddScategory() {
    yield takeEvery(ADD_SCATEGORY_REQUEST, addScategory);
}

function getScategoryListAPI() {
    return axios.get('/scategory');
}

function* getScategoryList() {
    try {
        const result = yield call(getScategoryListAPI);
        yield put({
            type: GET_SCATEGORYLIST_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: GET_SCATEGORYLIST_FAILURE,
            error: e,
        });
    }
}

function* watchGetScategoryList() {
    yield takeLatest(GET_SCATEGORYLIST_REQUEST, getScategoryList);
}

function changeBcategoryOrderAPI(bcategoriesData: { bcategory1: string, bcategory2: string }) {
    return axios.patch('/bcategory/order', bcategoriesData, {
        withCredentials: true,
    });
}

function* changeBcategoryOrder(action: ChangeBcategoryOrderRequestAction) {
    try {
        yield call(changeBcategoryOrderAPI, action.data);
        yield put({
            type: CHANGE_BCATEGORY_ORDER_SUCCESS,
        });
        yield put({
            type: GET_BCATEGORY_REQUEST,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: CHANGE_BCATEGORY_ORDER_FAILURE,
            error: e,
        });
    }
}

function* watchChangeBcategoryOrder() {
    yield takeEvery(CHANGE_BCATEGORY_ORDER_REQUEST, changeBcategoryOrder);
}

export default function* bcategorySaga() {
    yield all([
        fork(watchAddBcategory),
        fork(watchGetBcategory),
        fork(watchAddScategory),
        fork(watchGetScategoryList),
        fork(watchChangeBcategoryOrder),
    ]);
}