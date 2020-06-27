import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import {
    GET_CATEGORY_POSTS_REQUEST, GET_CATEGORY_POSTS_SUCCESS, GET_CATEGORY_POSTS_FAILURE, GetCategoryPostsRequestAction,
} from '../reducers/postlist';

function getCategoryPostsAPI(scategory: string) {
    return axios.get(`/posts/${scategory}`);
}

function* getCategoryPosts(action: GetCategoryPostsRequestAction) {
    try {
        const result = yield call(getCategoryPostsAPI, action.data);
        yield put({
            type: GET_CATEGORY_POSTS_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: GET_CATEGORY_POSTS_FAILURE,
            error: e,
        });
    }
}

function* watchGetCategoryPosts() {
    yield takeLatest(GET_CATEGORY_POSTS_REQUEST, getCategoryPosts);
}

export default function* postistSaga() {
    yield all([
        fork(watchGetCategoryPosts),
    ]);
}