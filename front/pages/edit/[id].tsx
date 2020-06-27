import React, { useState, useEffect, useCallback, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Input, Select } from 'antd';

import DraftEditorEdit from '../../components/DraftEditorEdit';
import { RootState } from '../../reducers';

const Id = () => {
    const router = useRouter();
    const { id } = router.query;

    const nickname = useSelector((state: RootState) => state.user.me?.nickname);
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
        if (!countRef.current) {
            countRef.current = true;
            return;
        }
        else {
            if (isEditedPost) {
                Router.back();
            }
        }
    }, [isEditedPost]);

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
                <Select.Option value="javascript">JavaScript</Select.Option>
                <Select.Option value="cpp">C++</Select.Option>
            </Select>
            <DraftEditorEdit nickname={nickname} title={title} category={category} 
                language={language} editing={singlePost.content} uuid={singlePost.uuid} 
            />
        </>
    );
};

export default Id;