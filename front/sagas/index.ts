import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import category from './category';
import post from './post';
import postlist from './postlist';
import user from './user';
import image from './image';
import { backUrl } from '../config/config';

axios.defaults.baseURL = `${backUrl}/api`;

export default function* rootSaga() {
    yield all([
        fork(category),
        fork(post),
        fork(postlist),
        fork(user),
        fork(image),
    ]);
}