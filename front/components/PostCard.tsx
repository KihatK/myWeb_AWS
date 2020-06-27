import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Popover } from 'antd';
import { BookOutlined, BookFilled } from '@ant-design/icons';
import styled from 'styled-components';
import Prismjs from '../prismjs/prism';
import moment from 'moment';

import CommentList from './CommentList';
import { PostProps } from '../util/type';
import { RootState } from '../reducers';
import { BOOKMARK_POST_REQUEST, UNBOOKMARK_POST_REQUEST } from '../reducers/user';

moment.locale('ko');

const ContentDiv = styled.div`
    img {
        max-width: 100%;
        height: auto;
    }
`;
const DragA = styled.a`
    && {
        position: relative;
        top: 15px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
    }
`;

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
        <Card
            style={{ marginTop: '5px', position: 'relative' }}
            title={
                <div>
                    <div style={{ color: '#8A837E' }}>
                        {post.scategory}
                    </div>
                    <Popover content={<div>북마크</div>}>
                        {nickname
                            ? BookMarked?.find(p => p.uuid === post.uuid)
                                ? <BookFilled onClick={unbookmarkPost(post.uuid)} style={{ position: 'absolute', top: '20px', right: '20px' }}/>
                                : <BookOutlined onClick={bookmarkPost(post.uuid)} style={{ position: 'absolute', top: '20px', right: '20px' }}/>
                            : <div style={{ display: 'none' }}></div> 
                        }
                    </Popover>
                    <div style={{ fontSize: '36px' }}>
                        {post.title}
                    </div>
                    <br />
                    <Avatar style={{ position: 'relative', top: '5px' }}>
                        {post.User.nickname[0]}
                    </Avatar>
                    <span style={{ color: '#8A837E', position: 'relative', top: '7px', left: '10px' }}>
                        {post.User.nickname}
                    </span>
                    <span style={{ color: '#8A837E', position: 'relative', top: '7px', left: '20px' }}>
                        {moment(post.createdAt).format('YYYY-MM-DD HH:mm')}
                    </span>
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
                ? <div style={{ position: 'relative', top: '20px' }}>
                    <CommentList post={post}/>
                    <div>
                        &nbsp;
                    </div>
                </div>
                : null
            }
        </Card>
    );
}

export default PostCard;