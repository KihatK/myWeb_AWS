import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { SettingOutlined } from '@ant-design/icons';

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

    return (
        <StyledDiv>
            <StyledAvatar>{nickname ? nickname[0] : null}</StyledAvatar>
            <StyledSpan>{`${nickname}님`}</StyledSpan>
            <Link href="/bookmarks">
                <a><StyledBook/></a>
            </Link>
            <Link href="/setting">
                <a><SettingOutlined /></a>
            </Link>
            {admin && (
                <Link href="/categorysetting">
                    <a><StyledProfile/></a>
                </Link>
            )}
            <StyledLogout onClick={clickLogout}/>
        </StyledDiv>
    );
};

export default UserProfile;