import styled from 'styled-components';
import { Button } from 'antd';

export const StyledDiv = styled.div`
    && {
        flex: 1 0 25%;
    }
`;

export const StyledButton = styled(Button)`
    && {
        float: right;
        margin-bottom: 20px;
    }
`;

export const HeadBtnDiv = styled.div`
    && {
        display: inline-block;
    }
    & > button {
        background: #fbfbfb;
        color: #888;
        font-size: 18px;
        border: 0;
        padding-top: 5px;
        vertical-align: bottom;
        height: 34px;
        width: 36px;
    }
    & > button:hover,
    & > button:focus {
        background: #f3f3f3;
    }
`;
export const EditorStyleDiv = styled.div`
    && .DraftEditor-root {
        min-height: 400px;
        margin-bottom: 100px;
    }
    && {
        box-sizing: border-box;
        border: 1px solid #ddd;
        cursor: text;
        padding: 16px;
        border-radius: 2px;
        margin-bottom: 2em;
        box-shadow: inset 0px 1px 8px -3px #ABABAB;
        background: #fefefe;
    }
`;