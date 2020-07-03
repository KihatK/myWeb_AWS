import React, { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import wrapper, { IStore } from '../store/makeStore';
import { RootState } from '../reducers';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { GET_BCATEGORY_REQUEST } from '../reducers/category';
import { StyledH1, StyledTable, StyledDiv } from '../style/pages/bookmarks';

const bookmarks = () => {
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
    const BookMarked = useSelector((state: RootState) => state.user.me?.BookMarked);

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

    useEffect(() => {
        if (!nickname) {
            alert('로그인이 필요합니다.');
            Router.back();
            return;
        }
    }, [nickname]);

    return (
        <>
            <StyledH1>북마크한 글들</StyledH1>
            <StyledTable columns={columns} dataSource={BookMarked} />
            <StyledDiv>
                <br/>
                Made by Kihat
                <br/>
                &nbsp;
            </StyledDiv>
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