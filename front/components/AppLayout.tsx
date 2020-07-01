import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Row, Col, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons'

import CategoryDrawer from '../containers/CategoryDrawer';
import UserProfile from '../containers/UserProfile';
import { RootState } from '../reducers';

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
            <Row>
                <Col xs={24} md={4} style={{ background: '#F0F0F0' }}>
                    <Menu mode="horizontal" style={{ height: '65px' }}>
                        <Menu.Item key="category" style={{ verticalAlign: 'middle', top: '5px' }} onClick={showDrawer}>
                            <MenuOutlined />
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col xs={24} md={16} style={{ background: '#F0F0F0' }}>
                    <Menu mode="horizontal" style={{ textAlign: 'center', height: '65px' }}>
                        <Menu.Item key="blog" style={{ verticalAlign: 'middle', fontSize: '35px', top: '5px' }}>
                            <Link href="/">
                                <a>Kihat's Blog</a>
                            </Link>
                        </Menu.Item>
                    </Menu>
                    {children}
                </Col>
                <Col xs={24} md={4} style={{ background: '#F0F0F0' }}>
                    <Menu mode="horizontal" style={{ height: '65px' }}>
                        {me
                            ? (
                                <UserProfile/>  
                            )
                            : (
                                <Menu.Item key="login" style={{ verticalAlign: 'middle', top: '7px' }}>
                                    <Link href="/signin">
                                        <a>로그인</a>
                                    </Link>
                                </Menu.Item>
                            )
                        }
                    </Menu>
                </Col>
            </Row>
            <CategoryDrawer visible={visible} onClose={onClose}/>
        </>
    );
}

export default AppLayout;