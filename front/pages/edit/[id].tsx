import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import wrapper, { IStore } from '../../store/makeStore';
import { RootState } from '../../reducers';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { GET_BCATEGORY_REQUEST, GET_SCATEGORYLIST_REQUEST } from '../../reducers/category';
import { GET_POST_REQUEST } from '../../reducers/post';
import { StyledInput } from '../../style/pages/editid';

const EditPostContent = dynamic(() => import('../../components/EditPostContent'), { loading: () => <p>로딩중...</p> });

const Id = () => {
    const admin = useSelector((state: RootState) => state.user.me?.admin);

    return (
        <>
            {admin
                ? <EditPostContent/>
                : (
                    <div>
                        권한이 없습니다.
                    </div>
                )
            }
        </>
    );
};

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
        type: GET_SCATEGORYLIST_REQUEST,
    });
    store.dispatch({
        type: GET_POST_REQUEST,
        data: params?.id,
    });
    store.dispatch(END);
    await (store as IStore).sagaTask?.toPromise();
});

export default Id;