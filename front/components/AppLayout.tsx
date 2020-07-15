import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Row } from 'antd';
import { MenuOutlined } from '@ant-design/icons'

import CategoryDrawer from '../containers/CategoryDrawer';
import UserProfile from '../containers/UserProfile';
import { RootState } from '../reducers';
import {
    StyledCol, StyledMenu, StyledMenuAlign, StyledMenuItem, StyledMenuItemBlog, StyledMenuItemLogin, MenuUnderlined, DraftEditorStyled,
} from '../style/components/AppLayout';

interface Props {
    children: any;
}

const AppLayout = ({ children }: Props) => {
    const me = useSelector((state: RootState) => state.user.me);

    const [visible, setVisible] = useState(false);

    const showDrawer = useCallback(() => {
        setVisible(true);
    }, []);
    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <>
            <MenuUnderlined/>
            <DraftEditorStyled/>
            <Row>
                <StyledCol xs={24} md={4}>
                    <StyledMenu mode="horizontal">
                        <StyledMenuItem key="category" onClick={showDrawer}>
                            <MenuOutlined />
                        </StyledMenuItem>
                    </StyledMenu>
                </StyledCol>
                <StyledCol xs={24} md={16}>
                    <StyledMenuAlign mode="horizontal">
                        <StyledMenuItemBlog key="blog">
                            <Link href="/">
                                <a>Kihat's Blog</a>
                            </Link>
                        </StyledMenuItemBlog>
                    </StyledMenuAlign>
                    {children}
                </StyledCol>
                <StyledCol xs={24} md={4}>
                    <StyledMenu mode="horizontal">
                        {me
                            ? (
                                <UserProfile/>  
                            )
                            : (
                                <StyledMenuItemLogin key="login">
                                    <Link href="/signin">
                                        <a>로그인</a>
                                    </Link>
                                </StyledMenuItemLogin>
                            )
                        }
                    </StyledMenu>
                </StyledCol>
            </Row>
            <CategoryDrawer visible={visible} onClose={onClose}/>
        </>
    );
}

export default AppLayout;