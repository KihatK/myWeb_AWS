import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import wrapper, { IStore } from '../../store/makeStore';
import { RootState } from '../../reducers';
import { GET_POST_REQUEST } from '../../reducers/post';
import { GET_SCATEGORYLIST_REQUEST, GET_BCATEGORY_REQUEST } from '../../reducers/category';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';

const CategoryPostCard = dynamic(() => import('../../containers/CategoryPostCard'), { loading: () => <p>로딩중...</p> });

const Id = () => {
    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch();
    const { singlePost } = useSelector((state: RootState) => state.post);

    return (
        <CategoryPostCard post={singlePost} />
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, params }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
        type: LOAD_USER_REQUEST,
    });
    store.dispatch({
        type: GET_BCATEGORY_REQUEST,
    });
    store.dispatch({
        type: GET_POST_REQUEST,
        data: params?.id,
    });
    store.dispatch({
        type: GET_SCATEGORYLIST_REQUEST,
    });
    store.dispatch(END);
    await (store as IStore).sagaTask?.toPromise();
});

export default Id;