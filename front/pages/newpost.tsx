import React, { useState, useCallback, useEffect, useRef } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Select } from 'antd';

import DraftEditor from '../components/DraftEditor';
import { RootState } from '../reducers';
import { GET_SCATEGORYLIST_REQUEST } from '../reducers/category';

const newpost = () => {
    const dispatch = useDispatch();
    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
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
    }, [])

    useEffect(() => {
        dispatch({
            type: GET_SCATEGORYLIST_REQUEST,
        });
    }, []);

    useEffect(() => {
        if (!countRef.current) {
            countRef.current = true;
            return;
        }
        else {
            if (isAddedPost) {
                Router.back();
            }
        }
    }, [isAddedPost]);

    return (
        <>
            <Input placeholder="제목을 입력하세요" value={title} onChange={changeTitle} style={{ marginTop: '5px' }} />
            <Select
                style={{ width: '1012px' }}
                labelInValue
                defaultValue={{ key: category }}
                onChange={changeCategory}
            >
                {scategoryList.map(c => (
                    <Select.Option key={c.name} value={c.name}>{c.name}</Select.Option>
                ))}
            </Select>
            <Select
                style={{ width: '1012px' }}
                labelInValue
                defaultValue={{ key: language }}
                onChange={changeLanguage}
            >
                <Select.Option value="Javascript">javaScript</Select.Option>
                <Select.Option value="cpp">C++</Select.Option>
            </Select>
            <DraftEditor nickname={nickname} title={title} category={category} language={language}/>
        </>
    )
}

export default newpost;