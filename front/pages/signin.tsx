import React, { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Card } from 'antd';

import { RootState } from '../reducers';
import { LOG_IN_REQUEST } from '../reducers/user';

const SignIn = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, isLoggingIn, isLoggingInError } = useSelector((state: RootState) => state.user);

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const countRef = useRef(false);

    const changeId = useCallback((e) => {
        setId(e.target.value);
    }, []);
    const changePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const finishLogin = useCallback(() => {
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId: id,
                password,
            },
        });
    }, [id, password]);

    useEffect(() => {
        if (!countRef.current) {
            countRef.current = true;
            return;
        }
        else {
            if (isLoggedIn) {
                Router.push('/');
            }
        }
    }, [isLoggedIn]);

    return (
        <Card style={{ marginTop: '5px' }}>
            <h1 style={{ textAlign: 'center' }}>로그인하기</h1>
            <br/>
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
                    <Link href="/signup">
                        <a style={{ float: 'right' }}>회원가입하기</a>
                    </Link>
                </Form.Item>
                {isLoggingInError && <div style={{ color: 'red' }}>{isLoggingInError}</div>}
            </Form>
        </Card>
    );
}

export default SignIn;