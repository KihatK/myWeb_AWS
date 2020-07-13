import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import axios from 'axios';

import wrapper, { IStore } from '../store/makeStore';
import { RootState } from '../reducers';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { GET_BCATEGORY_REQUEST } from '../reducers/category';
import { END } from 'redux-saga';

const SignupContent = dynamic(() => import('../containers/SignupContent'), { loading: () => <p>로딩중...</p> });

const SignUp = () => {
    const { isSignedUp } = useSelector((state: RootState) => state.user);

    const countRef = useRef(false);

    useEffect(() => {
        if (!countRef.current) {
            countRef.current = true;
        }
        else {
            if (isSignedUp) {
                alert('회원가입이 완료되었습니다.');
                Router.push('/');
            }
        }
    }, [isSignedUp]);

    return (
        <SignupContent/>
    );
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
    store.dispatch(END);
    await (store as IStore).sagaTask?.toPromise();
});

export default SignUp;