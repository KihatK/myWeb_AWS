import styled from 'styled-components';
import { Col, Menu } from 'antd';

export const StyledCol = styled(Col)`
    && {
        background: #F0F0F0;
    }
`;

export const StyledMenu = styled(Menu)`
    && {
        height: 65px;
    }
`;

export const StyledMenuAlign = styled(Menu)`
    && {
        text-align: center;
        height: 65px;
    }
`;

export const StyledMenuItem = styled(Menu.Item)`
    && {
        vertical-align: middle;
        top: 5px;
    }
`;

export const StyledMenuItemBlog = styled(Menu.Item)`
    && {
        vertical-align: middle;
        font-size: 35px;
        top: 5px;
    }
`;

export const StyledMenuItemLogin = styled(Menu.Item)`
    && {
        vertical-align: middle;
        top: 7px;
    }
`;