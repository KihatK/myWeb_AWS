import styled, { createGlobalStyle } from 'styled-components';
import { Col, Menu } from 'antd';

export const DraftEditorStyled = createGlobalStyle`
    & .DraftEditor-editorContainer blockquote {
        border-left: 5px solid #eee;
        color: #666;
        font-family: 'Hoefler Text', 'Georgia', serif;
        font-style: italic;
        margin: 16px 0;
        padding: 10px 20px;
    }

    & .DraftEditor-editorContainer .public-DraftStyleDefault-pre > pre {
        background-color: rgba(0, 0, 0, 0.05);
        font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
        font-size: 16px;
        padding: 20px;
        margin-bottom: 20px;
    }
`;

export const MenuUnderlined = createGlobalStyle`
    & .ant-menu-horizontal {
        border-bottom: 2px solid #f0f0f0 !important;
    }
    & .ant-menu-item: hover, & .ant-menu-item-active {
        color: #1890ff !important;
        border-bottom: 0px !important;
    }
    & .ant-menu-horizontal > .ant-menu-item-selected {
        color: rgba(0, 0, 0, 0.65);
        border-bottom: 0px;
    }
    & .ant-menu-horizontal > .ant-menu-item {
        border-bottom: 0px;
    }
    & .ant-menu-horizontal > .ant-menu-submenu {
        border-bottom: 0px !important;
    }
    & .ant-menu-item-selected a:hover {
        color: #1890ff !important;
        border-bottom: 0px !important;
    }
    & .ant-menu-item-selected a {
        color: rgba(0, 0, 0, 0.65) !important;
        border-bottom: 0px !important;
    }
`;

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