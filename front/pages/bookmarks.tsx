import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

import { RootState } from '../reducers';

const bookmarks = () => {
    const BookMarked = useSelector((state: RootState) => state.user.me?.BookMarked);

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

    return (
        <>
            <h1 style={{ marginTop: '5px', textAlign: 'center' }}>북마크한 글들</h1>
            <Table style={{ marginTop: '5px' }} columns={columns} dataSource={BookMarked} />
            <div style={{ textAlign: 'center' }}>
                <br/>
                Made by Kihat
                <br/>
                &nbsp;
            </div>
        </>
    );
};

export default bookmarks;