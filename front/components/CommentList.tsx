import React from 'react';
import { Avatar, Comment, List } from 'antd';
import moment from 'moment';

interface Props {
    post: {
        title: string,
        content: string;
        scategory: string;
        User: {
            nickname: string,
        },
        Comments: {
            content: string,
            User: {
                nickname: string,
            }
            createdAt: string,
        }[],
        createdAt: string;
    };
}

const CommentList = ({ post }: Props) => {
    return (
        <List
            style={{ position: 'relative', top: '20px' }}
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={item => (
                <li>
                    <Comment
                        author={item.User.nickname}
                        avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                        content={item.content}
                        datetime={moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
                    />
                </li>
            )}
        />
    );
}

export default CommentList;