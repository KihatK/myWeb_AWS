import React from 'react';
import { END } from 'redux-saga';
import { Card } from 'antd';
import axios from 'axios';

import BcategoryOrder from '../containers/BcategoryOrder';
import wrapper, { IStore } from '../store/makeStore';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { GET_BCATEGORY_REQUEST } from '../reducers/category';

const categoryorder = () => {
    return (
        <Card>
            <BcategoryOrder/>
        </Card>
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

export default categoryorder;