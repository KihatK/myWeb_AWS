import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { RootState } from '../reducers';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { StyledCard, StyledDiv } from '../style/pages/signup';

const validateMessages = {
    required: '${label}를 입력하셔야 합니다',
};

const SignupContent = () => {
    const dispatch = useDispatch();
    const { isSigningUp, isSigningupError } = useSelector((state: RootState) => state.user);

    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const changeId = useCallback((e) => {
        setId(e.target.value);
    }, []);
    const changeNickname = useCallback((e) => {
        setNickname(e.target.value);
    }, []);
    const changePassword = useCallback((e) => {
        setPassword(e.target.value);
        if (passwordCheck !== e.target.value) {
            setPasswordError(true);
        }
        else {
            setPasswordError(false);
        }
    }, [passwordCheck]);
    const changePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        if (password !== e.target.value) {
            setPasswordError(true);
        }
        else {
            setPasswordError(false);
        }
    }, [password]);

    const finishSignup = useCallback(() => {
        if (!id) {
            alert('아이디를 입력하셔야 합니다.');
        }
        else if (!nickname) {
            alert('닉네임을 입력하셔야 합니다.');
        }
        else if (!password) {
            alert('비밀번호를 입력하셔야 합니다.');
        }
        else if (passwordError) {
            alert('비밀번호가 같지 않습니다.');
        }
        else {
            dispatch({
                type: SIGN_UP_REQUEST,
                data: {
                    userId: id,
                    nickname,
                    password,
                },
            });
        }
    }, [id, nickname, password, passwordError]);

    return (
        <StyledCard>
            <h1>회원가입하기</h1>
            <br />
            <Form validateMessages={validateMessages} onFinish={finishSignup}>
                <Form.Item label="아이디" rules={[{ required: true }]}>
                    <Input value={id} onChange={changeId} />
                </Form.Item>
                <Form.Item label="닉네임" rules={[{ required: true }]}>
                    <Input value={nickname} onChange={changeNickname} />
                </Form.Item>
                <Form.Item label="비밀번호">
                    <Input value={password} onChange={changePassword} type="password" />
                </Form.Item>
                <Form.Item label="비밀번호 확인">
                    <Input value={passwordCheck} onChange={changePasswordCheck} type="password" />
                    {passwordError && <StyledDiv>비밀번호가 같지 않습니다.</StyledDiv>}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isSigningUp}>
                        회원가입하기
                    </Button>
                </Form.Item>
                {isSigningupError && <StyledDiv>{isSigningupError}</StyledDiv>}
            </Form>
        </StyledCard>
    );
}

export default SignupContent;