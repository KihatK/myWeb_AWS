import { all, fork, takeEvery, put, call } from 'redux-saga/effects'
import axios from 'axios';

import {
    UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE, UploadImageRequestAction,
} from '../reducers/image';

function uploadImageAPI(formData: FormData) {
    return axios.post('/post/image', formData, {
        withCredentials: true,
    });
}

function* uploadImage(action: UploadImageRequestAction) {
    try {
        const result = yield call(uploadImageAPI, action.data);
        yield put({
            type: UPLOAD_IMAGE_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: UPLOAD_IMAGE_FAILURE,
            error: e,
        });
    }
}

function* watchUploadImage() {
    yield takeEvery(UPLOAD_IMAGE_REQUEST, uploadImage);
}

export default function* imageSaga() {
    yield all([
        fork(watchUploadImage),
    ]);
}