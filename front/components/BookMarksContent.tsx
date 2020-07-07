import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { RootState } from '../reducers';
import { StyledH1, StyledTable, StyledDiv } from '../style/pages/bookmarks';

const BookMarksContent = () => {
    const BookMarked = useSelector((state: RootState) => state.user.me?.BookMarked);

    const columns: { title: string, dataIndex: string, key: string, render?: (text: string) => JSX.Element }[] = [{
        title: '제목',
        dataIndex: 'titles',
        key: 'titles',
        render: (text) =>
            <Link href="/post/[id]" as={`/post/${text[1]}`}>
                <a>{text[0]}</a>
            </Link>,
    }, {
        title: '카테고리',
        dataIndex: 'scategory',
        key: 'scategory',
    }, {
        title: '날짜',
        dataIndex: 'createdAt',
        key: 'createdAt',
    }, {
        title: '조회수',
        dataIndex: 'view',
        key: 'view',
    }];

    return (
        <main>
            <StyledH1>북마크한 글들</StyledH1>
            <StyledTable columns={columns} dataSource={BookMarked} />
            <StyledDiv>
                <br />
                    Made by Kihat
                <br />
                &nbsp;
            </StyledDiv>
        </main>
    );
}

export default BookMarksContent;