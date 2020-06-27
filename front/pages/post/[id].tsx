import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import CategoryPostCard from '../../components/CategoryPostCard';
import { RootState } from '../../reducers';
import { GET_POST_REQUEST } from '../../reducers/post';
import { GET_SCATEGORYLIST_REQUEST } from '../../reducers/category';

const Id = () => {
    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch();
    const { singlePost } = useSelector((state: RootState) => state.post);

    useEffect(() => {
        dispatch({
            type: GET_POST_REQUEST,
            data: id,
        });
        dispatch({
            type: GET_SCATEGORYLIST_REQUEST,
        });
    }, []);

    return (
        <CategoryPostCard post={singlePost} />
    );
}

export default Id;