import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from 'antd';
import Prismjs from '../prismjs/prism';
import moment from 'moment';

import { RootState } from '../reducers';
import { BOOKMARK_POST_REQUEST, UNBOOKMARK_POST_REQUEST } from '../reducers/user';
import {
    ContentDiv, DragA, StyledCard, StyledDivScategory, StyledBookFilled, StyledBookOutlined, StyledNoneDiv,
    StyledDivTitle, StyledAvatar, StyledSpanNickname, StyledSpanTime, StyledCommentDiv,
} from '../style/containers/PostCard';
import { BookMarkType } from '../util/user';
import { PostProps } from '../util/props';

moment.locale('ko');

const CommentList = dynamic(() => import('../components/CommentList'), { loading: () => <p>로딩중...</p>, ssr: false });

const PostCard = ({ post }: PostProps) => {
    const dispatch = useDispatch();
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
    const BookMarked = useSelector((state: RootState) => state.user.me?.BookMarked);

    const [toggleComment, setToggleComment] = useState(false);

    const clickToggleComment = useCallback(() => {
        if (toggleComment) {
            setToggleComment(false);
        }
        else {
            setToggleComment(true);
        }
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