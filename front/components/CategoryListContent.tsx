import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { RootState } from '../reducers';
import { StyledTable, StyledButton, StyledDiv } from '../style/pages/categoryid';

const CategoryListContent = () => {
    const { postList } = useSelector((state: RootState) => state.postlist);
    const admin = useSelector((state: RootState) => state.user.me?.admin);

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
            <StyledTable columns={columns} dataSource={postList} />
            {admin && 
                (
                    <Link href="/newpost" prefetch>
                        <a>
                            <StyledButton>
                                글쓰기
                            </StyledButton>
                        </a>
                    </Link>
                )
            }
            <StyledDiv>
                <br/>
                Made by Kihat
                <br/>
                &nbsp;
            </StyledDiv>
        </main>
    );
}

export default CategoryListContent;