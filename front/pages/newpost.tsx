import React, { useState, useCallback, useEffect, useRef } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { Select } from 'antd';
import axios from 'axios';

import DraftEditor from '../containers/DraftEditor';
import wrapper, { IStore } from '../store/makeStore';
import { RootState } from '../reducers';
import { GET_SCATEGORYLIST_REQUEST, GET_BCATEGORY_REQUEST } from '../reducers/category';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { StyledInput } from '../style/pages/newpost';

const newpost = () => {
    const dispatch = useDispatch();
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
    const admin = useSelector((state: RootState) => state.user.me?.admin);
    const scategoryList = useSelector((state: RootState) => state.category.scategoryList);
    const { isAddedPost } = useSelector((state: RootState) => state.post);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Module');
    const [language, setLanguage] = useState('javascript');
    const countRef = useRef(false);

    const changeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const changeCategory = useCallback(value => {
        setCategory(value.key);
    }, []);

    const changeLanguage = useCallback(value => {
        setLanguage(value.key);
    }, []);

    useEffect(() => {
        if (!admin) {
            alert('권한이 없습니다.');
            Router.back();
        }
    }, [admin]);

    useEffect(() => {
        if (!countRef.current) {
            countRef.current = true;
        }
        else {
            if (isAddedPost) {
                Router.back();
            }
        }
    }, [isAddedPost]);

    return (
        <>
            <StyledInput placeholder="제목을 입력하세요" value={title} onChange={changeTitle}/>
            <Select
                style={{ width: '1000px' }}
                labelInValue
                defaultValue={{ key: category }}
                onChange={changeCategory}
            >
                {scategoryList.map((c: { name: string }) => (
                    <Select.Option key={c.name} value={c.name}>{c.name}</Select.Option>
                ))}
            </Select>
            <Select
                style={{ width: '1000px' }}
                labelInValue
                defaultValue={{ key: language }}
                onChange={changeLanguage}
            >
                <Select.Option value="Javascript">JavaScript</Select.Option>
                <Select.Option value="cpp">C++</Select.Option>
            </Select>
            <DraftEditor nickname={nickname} title={title} category={category} language={language}/>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req }) => {
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
    store.dispatch({
        type: GET_SCATEGORYLIST_REQUEST,
    });
    store.dispatch(END);
    await (store as IStore).sagaTask?.toPromise();
});

export default newpost;