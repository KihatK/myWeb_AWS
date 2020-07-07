import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import wrapper, { IStore } from '../store/makeStore';
import { RootState } from '../reducers';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { GET_BCATEGORY_REQUEST } from '../reducers/category';

const BookMarksContent = dynamic(() => import('../components/BookMarksContent'), { loading: () => <p>로딩중...</p> });

const bookmarks = () => {
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);

    useEffect(() => {
        if (!nickname) {
            Router.push('/');
        }
    }, [nickname]);

    return (
        <>
            {nickname
                ? <BookMarksContent/>
                : (
                    <div>
                        로그인이 필요합니다.
                    </div>
                )
            }
        </>
    );
};

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
    store.dispatch(END);
    await (store as IStore).sagaTask?.toPromise();
});

export default bookmarks;