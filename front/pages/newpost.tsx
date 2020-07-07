import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import wrapper, { IStore } from '../store/makeStore';
import { RootState } from '../reducers';
import { GET_SCATEGORYLIST_REQUEST, GET_BCATEGORY_REQUEST } from '../reducers/category';
import { LOAD_USER_REQUEST } from '../reducers/user';

const NewPostContent = dynamic(() => import('../components/NewPostContent'), { loading: () => <p>로딩중...</p> });

const newpost = () => {
    const admin = useSelector((state: RootState) => state.user.me?.admin);

    return (
        <>
            {admin
                ? <NewPostContent/>
                : (
                    <div>
                        권한이 없습니다.
                    </div>
                )
            }
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req }) => {
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
        type: GET_SCATEGORYLIST_REQUEST,
    });
    store.dispatch(END);
    await (store as IStore).sagaTask?.toPromise();
});

export default newpost;