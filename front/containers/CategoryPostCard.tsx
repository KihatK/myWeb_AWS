import React, { useState, useCallback, useEffect, useRef } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from 'antd';
import moment from 'moment';
import Prismjs from '../prismjs/prism';

import CommentList from '../components/CommentList';
import CommentForm from './CommentForm';
import { RootState } from '../reducers';
import { REMOVE_POST_REQUEST } from '../reducers/post';
import { BOOKMARK_POST_REQUEST, UNBOOKMARK_POST_REQUEST } from '../reducers/user';
import {
    ContentDiv, DragA, StyledCard, StyledDivScategory, StyledBookFilled, StyledBookOutlined, StyledNoneDiv,
    StyledDivTitle, StyledAvatar, StyledSpanNickname, StyledSpanTime, StyledButtonDelete, StyledButtonEdit, StyledCommentDiv,
} from '../style/containers/PostCard';
import { BookMarkType } from '../util/user';
import { PostProps } from '../util/props';

moment.locale('ko');

const CategoryPostCard = ({ post }: PostProps) => {
    const dispatch = useDispatch();
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
    const BookMarked = useSelector((state: RootState) => state.user.me?.BookMarked);
    const { isRemovedPost } = useSelector((state: RootState) => state.post);

    const [toggleComment, setToggleComment] = useState(false);
    const countRef = useRef(false);

    const clickToggleComment = useCallback(() => {
        if (toggleComment) {
            return setToggleComment(false);
        }
        return setToggleComment(true);
    }, [toggleComment]);

    const removePost = useCallback(uuid => () => {
        if (confirm('정말 삭제하시겠습니까?')) {
            dispatch({
                type: REMOVE_POST_REQUEST,
                data: uuid,
            });
        }
    }, []);
    const editPost = useCallback(uuid => () => {
        if (confirm('정말 수정하시겠습니까?')) {
            Router.push('/edit/[id]', `/edit/${uuid}`);
        }
    }, []);

    const bookmarkPost = useCallback(uuid => () => {
        dispatch({
            type: BOOKMARK_POST_REQUEST,
            data: uuid,
        });
    }, []);
    const unbookmarkPost = useCallback(uuid => () => {
        dispatch({
            type: UNBOOKMARK_POST_REQUEST,
            data: uuid,
        });
    }, []);

    useEffect(() => {
        Prismjs.highlightAll();
    }, [post]);

    useEffect(() => {
        if (!countRef.current) {
            countRef.current = true;
            return;
        }
        else {
            if (isRemovedPost) {
                Router.back();
            }
        }
    }, [isRemovedPost]);

    return (
        <StyledCard
            title={
                <div>
                    <StyledDivScategory>
                        {post.scategory}
                    </StyledDivScategory>
                    <Popover content={<div>북마크</div>}>
                        {nickname
                            ? BookMarked?.find((p: BookMarkType) => p.uuid === post.uuid)
                                ? <StyledBookFilled onClick={unbookmarkPost(post.uuid)}/>
                                : <StyledBookOutlined onClick={bookmarkPost(post.uuid)}/>
                            : <StyledNoneDiv></StyledNoneDiv> 
                        }
                    </Popover>
                    <StyledDivTitle>
                        {post.title}
                    </StyledDivTitle>
                    <br />
                    <StyledAvatar>
                        {post.User.nickname[0]}
                    </StyledAvatar>
                    <StyledSpanNickname>
                        {post.User.nickname}
                    </StyledSpanNickname>
                    <StyledSpanTime>
                        {moment(post.createdAt).format('YYYY-MM-DD HH:mm')}
                    </StyledSpanTime>
                </div>
            }
            bordered={true}
        >
            <ContentDiv dangerouslySetInnerHTML={{ __html: post.content }}>

            </ContentDiv>
            <DragA onClick={clickToggleComment}>
                <u>댓글</u>
            </DragA>
            <StyledButtonDelete onClick={removePost(post.uuid)}>삭제</StyledButtonDelete>
            <StyledButtonEdit onClick={editPost(post.uuid)}>수정</StyledButtonEdit>
            {toggleComment 
                ? <StyledCommentDiv>
                    <CommentForm post={post}/>
                    <CommentList post={post}/>
                    <div>
                        &nbsp;
                    </div>
                </StyledCommentDiv>
                : null
            }
        </StyledCard>
    );
}

export default CategoryPostCard;