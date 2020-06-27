import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';

import { RootState } from '../../reducers';
import { GET_CATEGORY_POSTS_REQUEST } from '../../reducers/postlist';

const Category = () => {
    const router = useRouter();
    const { category } = router.query;

    const dispatch = useDispatch();
    const { postList } = useSelector((state: RootState) => state.postlist);
    const admin = useSelector((state: RootState) => state.user.me?.admin);

    const clickPost = useCallback(() => {
        Router.push('/newpost');
    }, []);

    const columns: { title: string, dataIndex: string, key: string, render?: (text: string) => JSX.Element }[] = [
        {
            title: '제목',
            dataIndex: 'titles',
            key: 'titles',
            render: (text) => 
                <Link href="/post/[id]" as={`/post/${text[1]}`}>
                    <a>{text[0]}</a>
                </Link>,
        },
        {
            title: '카테고리',
            dataIndex: 'scategory',
            key: 'scategory',
        },
        {
            title: '날짜',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: '조회수',
            dataIndex: 'view',
            key: 'view',
        },
    ];

    useEffect(() => {
        dispatch({
            type: GET_CATEGORY_POSTS_REQUEST,
            data: category,
        });
    }, [category]);

    return (
        <>
            <h1 style={{ marginTop: '5px', textAlign: 'center' }}>{category}</h1>
            <Table style={{ marginTop: '5px' }} columns={columns} dataSource={postList} />
            {admin && 
                (
                    <Button onClick={clickPost} style={{ position: 'absolute', bottom: '80px' }}>
                        글쓰기
                    </Button>
                )
            }
            <div style={{ textAlign: 'center' }}>
                <br/>
                Made by Kihat
                <br/>
                &nbsp;
            </div>
        </>
    );
}

export default Category;