import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostCard from '../components/PostCard';
import { RootState } from '../reducers';
import { GET_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const dispatch = useDispatch();

    const { mainPosts } = useSelector((state: RootState) => state.post);

    useEffect(() => {
        dispatch({
            type: GET_POSTS_REQUEST,
        });
    }, []);
    
    return (
        <>
            {mainPosts.map(v => <PostCard key={v.createdAt} post={v} />)}
            <div style={{ textAlign: 'center' }}>
                <br/>
                Made by Kihat
                <br/>
                &nbsp;
            </div>
        </>
    );
};

export default Home;