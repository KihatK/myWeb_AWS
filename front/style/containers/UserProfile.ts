import styled from 'styled-components';
import { Avatar } from 'antd';
import { LogoutOutlined, BookOutlined, ProfileOutlined } from '@ant-design/icons';

export const StyledDiv = styled.div`
    && {
        vertical-align: middle;
        position: relative;
        top: 5px;
    }
`;

export const StyledSpan = styled.span`
    && {
        margin-right: 10px;
    }
`;

export const StyledAvatar = styled(Avatar)`
    && {
        margin-right: 10px;
    }
`;

export const StyledBook = styled(BookOutlined)`
    && {
        margin-right: 10px;
    }
`;

export const StyledProfile = styled(ProfileOutlined)`
    && {
        margin-left: 10px;
    }
`;

export const StyledLogout = styled(LogoutOutlined)`
    && {
        margin-left: 10px;
    }
`;