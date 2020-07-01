import styled from 'styled-components';
import { Card, Avatar, Popover } from 'antd';
import { BookOutlined, BookFilled } from '@ant-design/icons';

export const ContentDiv = styled.div`
    img {
        max-width: 100%;
        height: auto;
    }
`;

export const DragA = styled.a`
    && {
        position: relative;
        top: 15px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
    }
`;

export const StyledCard = styled(Card)`
    && {
        margin-top: 5px;
        position: relative;
    }
`;

export const StyledDivScategory = styled.div`
    && {
        color: #8A837E;
    }
`;

export const StyledBookFilled = styled(BookFilled)`
    && {
        position: absolute;
        top: 20px;
        right: 20px;
    }
`;

export const StyledBookOutlined = styled(BookOutlined)`
    && {
        position: absolute;
        top: 20px;
        right: 20px;
    }
`;

export const StyledNoneDiv = styled.div`
    && {
        display: none;
    }
`;

export const StyledDivTitle = styled.div`
    && {
        font-size: 36px;
    }
`;

export const StyledAvatar = styled(Avatar)`
    && {
        position: relative;
        top: 5px;
    }
`;

export const StyledSpanNickname = styled.span`
    && {
        color: #8A837E;
        position: relative;
        top: 7px;
        left: 10px;
    }
`;

export const StyledSpanTime = styled.span`
    && {
        color: #8A837E;
        position: relative;
        top: 7px;
        left: 20px;
    }
`;

export const StyledButtonDelete = styled.button`
    && {
        position: absolute;
        bottom: 7px;
        right: 7px;
    }
`;

export const StyledButtonEdit = styled.button`
    && {
        position: absolute;
        bottom: 7px;
        right: 57px;
    }
`;

export const StyledCommentDiv = styled.div`
    && {
        position: relative;
        top: 20px;
    }
`;