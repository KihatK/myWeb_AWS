import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { RootState } from '../reducers';
import { LOG_IN_REQUEST } from '../reducers/user';
import { StyledCard, StyledA, StyledDiv } from '../style/pages/signin';

const SigninContent = () => {
    const dispatch = useDispatch();
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
    const { isLoggingIn, isLoggingInError } = useSelector((state: RootState) => state.user);

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const changeId = useCallback((e) => {
        setId(e.target.value);
    }, []);
    const changePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const finishLogin = useCallback(() => {
        if (!nickname) {
            dispatch({
                type: LOG_IN_REQUEST,
                data: {
                    userId: id,
                    password,
                },
            });
        }
    }, [id, password, nickname]);

    return (
        <StyledCard>
            <h1>로그인하기</h1>
            <br />
            <Form onFinish={finishLogin}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: '아이디를 입력하셔야 합니다!' }]}
                >
                    <Input value={id} onChange={changeId} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: '비밀번호를 입력하셔야 합니다!' }]}
                >
                    <Input.Password value={password} onChange={changePassword} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoggingIn}>
                        로그인
                                </Button>
                    <Link href="/signup" prefetch>
                        <StyledA>회원가입하기</StyledA>
                    </Link>
                </Form.Item>
                {isLoggingInError && <StyledDiv>{isLoggingInError}</StyledDiv>}
            </Form>
        </StyledCard>
    );
}

export default SigninContent;