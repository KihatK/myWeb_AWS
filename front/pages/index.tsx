import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';

import PostCard from '../containers/PostCard';
import wrapper, { IStore } from '../store/makeStore';
import { RootState } from '../reducers';
import { GET_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { GET_BCATEGORY_REQUEST } from '../reducers/category';
import { StyledDiv } from '../style/pages/home';
import { Post } from '../util/post';

const Home = () => {
    const mainPosts = useSelector((state: RootState) => state.post.mainPosts);
    
    return (
        <>
            {mainPosts.map((v: Post) => <PostCard key={v.createdAt} post={v} />)}
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
    //쿠키를 쓰지 않고 요청을 보낼 때, 서버에서 공유하고 있는 쿠키를 제거한다.
    //이렇게 하면 쿠키를 쓰지 않고 요청을 보낼 때 기존에 있던 쿠키를 사용하게 되는 불상사를 피할 수 있다.
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
        type: GET_POSTS_REQUEST,
    });
    store.dispatch(END);
    await (store as IStore).sagaTask?.toPromise();
});

export default Home;