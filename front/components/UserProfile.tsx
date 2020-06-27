import React, { useCallback } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Popover } from 'antd';
import { SettingOutlined, LogoutOutlined, BookOutlined, ProfileOutlined } from '@ant-design/icons';

import { RootState } from '../reducers';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
    const dispatch = useDispatch();
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
    const admin = useSelector((state: RootState) => state.user.me?.admin);

    const clickLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    const clickCategoryOrder = useCallback(() => {
        Router.push('/categoryorder');
    }, []);

    const clickBookmarks = useCallback(() => {
        Router.push('/bookmarks');
    }, []);

    return (
        <div style={{ verticalAlign: 'middle', position: 'relative', top: '5px' }}>
            <Avatar style={{ marginRight: '10px' }}>{nickname ? nickname[0] : null}</Avatar>
            <span style={{ marginRight: '10px' }}>{`${nickname}님`}</span>
            <Popover content={<div>북마크</div>}>
                <BookOutlined onClick={clickBookmarks} style={{ marginRight: '10px' }} />
            </Popover>
            <Popover content={<div>설정</div>}>
                <SettingOutlined />
            </Popover>
            {admin && (
                <Popover content={<div>카테고리 순서</div>}>
                    <ProfileOutlined onClick={clickCategoryOrder} style={{ marginLeft: '10px' }} />
                </Popover>
            )}
            <Popover content={<div>로그아웃</div>}>
                <LogoutOutlined onClick={clickLogout} style={{ marginLeft: '10px' }} />
            </Popover>
        </div>
    );
};

export default UserProfile;