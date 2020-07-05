import React, { useState, useEffect, useCallback, useRef } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { Select } from 'antd';
import axios from 'axios';

import DraftEditorEdit from '../../containers/DraftEditorEdit';
import wrapper, { IStore } from '../../store/makeStore';
import { RootState } from '../../reducers';
import { LOAD_USER_REQUEST } from '../../reducers/user';
import { GET_BCATEGORY_REQUEST, GET_SCATEGORYLIST_REQUEST } from '../../reducers/category';
import { GET_POST_REQUEST } from '../../reducers/post';
import { StyledInput } from '../../style/pages/editid';

const Id = () => {
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
    const admin = useSelector((state: RootState) => state.user.me?.admin);
    const scategoryList = useSelector((state: RootState) => state.category.scategoryList);
    const { singlePost, isEditedPost } = useSelector((state: RootState) => state.post);

    const [title, setTitle] = useState(singlePost.title);
    const [category, setCategory] = useState(singlePost.scategory);
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
            if (isEditedPost) {
                Router.back();
            }
        }
    }, [isEditedPost]);

    return (
        <>
            <StyledInput placeholder="제목을 입력하세요" value={title} onChange={changeTitle} />
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
                <Select.Option value="javascript">JavaScript</Select.Option>
                <Select.Option value="cpp">C++</Select.Option>
            </Select>
            <DraftEditorEdit nickname={nickname} title={title} category={category} 
                language={language} editing={singlePost.content} uuid={singlePost.uuid} 
            />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, params }) => {
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
    store.dispatch({
        type: GET_POST_REQUEST,
        data: params?.id,
    });
    store.dispatch(END);
    await (store as IStore).sagaTask?.toPromise();
});

export default Id;