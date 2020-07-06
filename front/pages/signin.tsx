import React, { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

import wrapper, { IStore } from '../store/makeStore';
import { RootState } from '../reducers';
import { LOG_IN_REQUEST, LOAD_USER_REQUEST } from '../reducers/user';
import { GET_BCATEGORY_REQUEST } from '../reducers/category';
import { StyledCard, StyledA, StyledDiv } from '../style/pages/signin';

const SignIn = () => {
    const dispatch = useDispatch();
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
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

    useEffect(() => {
        if (!countRef.current) {
            countRef.current = true;
        }
        else {
            if (isLoggedIn) {
                Router.push('/');
            }
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (nickname) {
            Router.push('/');
            return;
        }
    }, [nickname]);

    return (
        <StyledCard>
            <h1>로그인하기</h1>
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
                    <Link href="/signup" prefetch>
                        <StyledA>회원가입하기</StyledA>
                    </Link>
                </Form.Item>
                {isLoggingInError && <StyledDiv>{isLoggingInError}</StyledDiv>}
            </Form>
        </StyledCard>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
        type: LOAD_USER_REQUEST,
    });
    store.dispatch({
        type: GET_BCATEGORY_REQUEST,
    });
    store.dispatch(END);
    await (store as IStore).sagaTask?.toPromise();
});

export default SignIn;