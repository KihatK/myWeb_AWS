import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import wrapper, { IStore } from '../store/makeStore';
import { RootState } from '../reducers';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { GET_BCATEGORY_REQUEST } from '../reducers/category';

const SigninContent = dynamic(() => import('../containers/SigninContent'), { loading: () => <p>로딩중...</p> });

const SignIn = () => {
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
    const { isLoggedIn } = useSelector((state: RootState) => state.user);

    const countRef = useRef(false);

    useEffect(() => {
        if (!countRef.current) {
            countRef.current = true;
        }
        else {
            if (isLoggedIn) {
                Router.push('/');
            }
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (nickname) {
            Router.push('/');
        }
    }, [nickname]);

    return (
        <>
            {nickname
                ? (
                    <div>
                        이미 로그인 중입니다.
                    </div>
                )
                : <SigninContent/>
            }
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store }) => {
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

export default SignIn;