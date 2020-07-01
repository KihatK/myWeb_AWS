import React, { useCallback, useEffect, useRef } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import wrapper, { IStore } from '../../store/makeStore';
import { RootState } from '../../reducers';
import { GET_CATEGORY_POSTS_REQUEST } from '../../reducers/postlist';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { GET_BCATEGORY_REQUEST } from '../../reducers/category';
import { StyledH1, StyledTable, StyledButton, StyledDiv } from '../../style/pages/categoryid';

const Category = () => {
    const router = useRouter();
    const { category } = router.query;

    const dispatch = useDispatch();
    const { postList } = useSelector((state: RootState) => state.postlist);
    const admin = useSelector((state: RootState) => state.user.me?.admin);

    const countRef = useRef(false);

    const clickPost = useCallback(() => {
        Router.push('/newpost');
    }, []);

    const columns: { title: string, dataIndex: string, key: string, render?: (text: string) => JSX.Element }[] = [{
        title: '제목',
        dataIndex: 'titles',
        key: 'titles',
        render: (text) =>
            <Link href="/post/[id]" as={`/post/${text[1]}`}>
                <a>{text[0]}</a>
            </Link>,
    }, {
        title: '카테고리',
        dataIndex: 'scategory',
        key: 'scategory',
    }, {
        title: '날짜',
        dataIndex: 'createdAt',
        key: 'createdAt',
    }, {
        title: '조회수',
        dataIndex: 'view',
        key: 'view',
    }];

    return (
        <>
            <StyledH1>{category}</StyledH1>
            <StyledTable columns={columns} dataSource={postList} />
            {admin && 
                (
                    <StyledButton onClick={clickPost}>
                        글쓰기
                    </StyledButton>
                )
            }
            <StyledDiv>
                <br/>
                Made by Kihat
                <br/>
                &nbsp;
            </StyledDiv>
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