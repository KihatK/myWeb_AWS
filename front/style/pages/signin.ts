import styled from 'styled-components';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
    && {
        margin-top: 5px;
    }

    & > h1 {
        text-align: center;
    }
`;

export const StyledA = styled.a`
    && {
        float: right;
    }
`;

export const StyledDiv = styled.div`
    && {
        color: red;
    }
`;