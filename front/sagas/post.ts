import { all, fork, takeEvery, put, delay, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, AddCommentRequestAction,
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, AddPostRequestAction, AddPostData,
    GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE,
    GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE, GetPostRequestAction,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, RemovePostRequestAction,
    EDIT_POST_REQUEST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE, EditPostRequestAction, EditPostData
} from '../reducers/post';

function addCommentAPI(commentData: { comment: string, postId: string }) {
    return axios.post(`/post/${commentData.postId}/comment`, { comment: commentData.comment}, {
        withCredentials: true,
    });
}

function* addComment(action: AddCommentRequestAction) {
    try {
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e,
        });
    }
}

function* watchAddComment() {
    yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}

function addPostAPI(addPostData: AddPostData) {
    return axios.post('/post', addPostData, {
        withCredentials: true,
    });
}

function* addPost(action: AddPostRequestAction) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        });
    }
}

function* watchAddPost() {
    yield takeEvery(ADD_POST_REQUEST, addPost);
}

function getPostsAPI() {
    return axios.get('/posts');
}

function* getPosts() {
    try {
        const result = yield call(getPostsAPI);
        yield put({
            type: GET_POSTS_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: GET_POSTS_FAILURE,
            error: e,
        });
    }
}

function* watchGetPosts() {
    yield takeLatest(GET_POSTS_REQUEST, getPosts);
}

function getPostAPI(postId: string) {
    return axios.get(`/post/${postId}`);
}

function* getPost(action: GetPostRequestAction) {
    try {
        const result = yield call(getPostAPI, action.data);
        yield put({
            type: GET_POST_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: GET_POST_FAILURE,
            error: e,
        });
    }
}

function* watchGetPost() {
    yield takeLatest(GET_POST_REQUEST, getPost);
}

function removePostAPI(uuid: string) {
    return axios.delete(`/post/${uuid}`, {
        withCredentials: true,
    });
}

function* removePost(action: RemovePostRequestAction) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: e,
        });
    }
}

function* watchRemovePost() {
    yield takeEvery(REMOVE_POST_REQUEST, removePost);
}

function editPostAPI(editData: EditPostData) {
    return axios.patch(`/post/${editData.uuid}`, editData, {
        withCredentials: true,
    });
}

function* editPost(action: EditPostRequestAction) {
    try {
        yield call(editPostAPI, action.data);
        yield put({
            type: EDIT_POST_SUCCESS,
        });
    }
    catch (e) {
        console.error(e);
        yield put({
            type: EDIT_POST_FAILURE,
            error: e,
        });
    }
}

function* watchEditPost() {
    yield takeEvery(EDIT_POST_REQUEST, editPost);
}

export default function* postSaga() {
    yield all([
        fork(watchAddComment),
        fork(watchAddPost),
        fork(watchGetPosts),
        fork(watchGetPost),
        fork(watchRemovePost),
        fork(watchEditPost),
    ]);
}