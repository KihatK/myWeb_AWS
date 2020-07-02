import React, { useCallback } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Popover } from 'antd';
import { SettingOutlined, LogoutOutlined, BookOutlined, ProfileOutlined } from '@ant-design/icons';

import { RootState } from '../reducers';
import { LOG_OUT_REQUEST } from '../reducers/user';
import { StyledDiv, StyledAvatar, StyledBook, StyledProfile, StyledLogout, StyledSpan } from '../style/containers/UserProfile';

const UserProfile = () => {
    const dispatch = useDispatch();
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
    const admin = useSelector((state: RootState) => state.user.me?.admin);

    const clickLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    const clickCategorySetting = useCallback(() => {
        Router.push('/categorysetting');
    }, []);

    const clickBookmarks = useCallback(() => {
        Router.push('/bookmarks');
    }, []);

    return (
        <StyledDiv>
            <StyledAvatar>{nickname ? nickname[0] : null}</StyledAvatar>
            <StyledSpan>{`${nickname}님`}</StyledSpan>
            <Popover content={<div>북마크</div>}>
                <StyledBook onClick={clickBookmarks}/>
            </Popover>
            <Popover content={<div>설정</div>}>
                <SettingOutlined />
            </Popover>
            {admin && (
                <Popover content={<div>카테고리 설정</div>}>
                    <StyledProfile onClick={clickCategorySetting}/>
                </Popover>
            )}
            <Popover content={<div>로그아웃</div>}>
                <StyledLogout onClick={clickLogout}/>
            </Popover>
        </StyledDiv>
    );
};

export default UserProfile;