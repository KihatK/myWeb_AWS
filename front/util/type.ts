import React from 'react';

export interface PostProps {
    post: {
        id: number,
        uuid: string,
        title: string,
        content: string,
        scategory: string,
        view: number,
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
        createdAt: string,
        updatedAt: string,
    };
}
export interface Post {
    id: number,
    uuid: string,
    title: string,
    content: string,
    scategory: string,
    view: number,
    User: {
        nickname: string,
    },
    Comments: {
        content: string,
        User: {
            nickname: string,
        },
        createdAt: string,
    }[],
    createdAt: string,
    updatedAt: string,
}