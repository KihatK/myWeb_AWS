import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Popover } from 'antd';
import { BookOutlined, BookFilled } from '@ant-design/icons';
import styled from 'styled-components';
import Prismjs from '../prismjs/prism';
import moment from 'moment';

import CommentList from '../components/CommentList';
import { PostProps } from '../util/type';
import { RootState } from '../reducers';
import { BOOKMARK_POST_REQUEST, UNBOOKMARK_POST_REQUEST, BookMarkType } from '../reducers/user';
import {
    ContentDiv, DragA, StyledCard, StyledDivScategory, StyledBookFilled, StyledBookOutlined, StyledNoneDiv,
    StyledDivTitle, StyledAvatar, StyledSpanNickname, StyledSpanTime, StyledButtonDelete, StyledButtonEdit, StyledCommentDiv,
} from '../style/containers/PostCard';

moment.locale('ko');

const PostCard = ({ post }: PostProps) => {
    const dispatch = useDispatch();
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
    const BookMarked = useSelector((state: RootState) => state.user.me?.BookMarked);

    const [toggleComment, setToggleComment] = useState(false);

    const clickToggleComment = useCallback(() => {
        if (toggleComment) {
            return setToggleComment(false);
        }
        return setToggleComment(true);
    }, [toggleComment]);

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
    }, []);

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
            {toggleComment 
                ? <StyledCommentDiv>
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

export default PostCard;