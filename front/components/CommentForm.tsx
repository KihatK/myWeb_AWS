import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { ADD_COMMENT_REQUEST } from '../reducers/post';
import { RootState } from '../reducers';
import { PostProps } from '../util/type';

const CommentForm = ({ post }: PostProps) => {
    const dispatch = useDispatch();
    const { isAddingComment, isAddedComment } = useSelector((state: RootState) => state.post);

    const [comment, setComment] = useState('');
    const countRef = useRef(false);

    const changeComment = useCallback((e) => {
        setComment(e.target.value);
    }, []);

    const finishComment = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                comment,
                postId: post.uuid,
            },
        });
    }, [comment]);

    useEffect(() => {
        if (!countRef.current) {
            countRef.current = true;
            return;
        }
        else {
            if (isAddedComment) {
                setComment('');
            }
        }
    }, [isAddedComment]);

    return (
        <Form onFinish={finishComment}>
            <Input.TextArea rows={3} value={comment} onChange={changeComment} />
            <Button htmlType="submit" loading={isAddingComment} style={{ float: 'right' }}>입력</Button>
        </Form>
    );
}

export default CommentForm;