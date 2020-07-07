import React, { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { Select } from 'antd';

import { RootState } from '../reducers';
import { StyledInput } from '../style/pages/editid';

const DraftEditorEdit = dynamic(() => import('../containers/DraftEditorEdit'));

const EditPostContent = () => {
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
            Router.push('/');
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
        <main>
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
        </main>
    );
}

export default EditPostContent;