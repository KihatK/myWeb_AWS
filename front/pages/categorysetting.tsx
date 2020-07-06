import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import BcategoryOrder from '../containers/BcategoryOrder';
import BcategorySetting from '../containers/BcategorySetting';
import ScategorySetting from '../containers/ScategorySetting';
import wrapper, { IStore } from '../store/makeStore';
import { RootState } from '../reducers';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { GET_BCATEGORY_REQUEST, GET_SCATEGORYLIST_REQUEST } from '../reducers/category';

const categoryorder = () => {
    const admin = useSelector((state: RootState) => state.user.me?.admin);

    useEffect(() => {
        if (!admin) {
            alert('권한이 없습니다.');
            Router.push('/');
        }
    }, [admin]);

    return (
        <>
            {admin
                ? (
                    <main>
                        <BcategoryOrder/>
                        <BcategorySetting/>
                        <ScategorySetting/>
                    </main>
                )
                : (
                    <div>
                        권한이 없습니다.
                    </div>
                )
            }
        </>
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
    store.dispatch({
        type: GET_SCATEGORYLIST_REQUEST,
    });
    store.dispatch(END);
    await (store as IStore).sagaTask?.toPromise();
});

export default categoryorder;