import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';

import wrapper, { IStore } from '../../store/makeStore';
import { GET_CATEGORY_POSTS_REQUEST } from '../../reducers/postlist';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { GET_BCATEGORY_REQUEST } from '../../reducers/category';
import { StyledH1 } from '../../style/pages/categoryid';

const CategoryListContent = dynamic(() => import('../../components/CategoryListContent'), { loading: () => <p>로딩중...</p> });

const Category = () => {
    const router = useRouter();
    const { category } = router.query;

    return (
        <>
            <StyledH1>{category}</StyledH1>
            <CategoryListContent/>
        </>
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
        type: GET_CATEGORY_POSTS_REQUEST,
        data: params?.category,
    });
    store.dispatch(END);
    await (store as IStore).sagaTask?.toPromise();
});

export default Category;