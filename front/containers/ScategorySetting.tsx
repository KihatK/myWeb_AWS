import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Select, Input, Form, Button } from 'antd';

import { RootState } from '../reducers';
import { EDIT_SCATEGORY_REQUEST, REMOVE_SCATEGORY_REQUEST } from '../reducers/category';
import { StyledCard } from '../style/containers/CategorySetting';

const BcategorySetting = () => {
    const dispatch = useDispatch();
    const { scategoryList } = useSelector((state: RootState) => state.category);

    const [categoryEdit, setCategoryEdit] = useState(scategoryList[0]?.name);
    const [newCategory, setNewCategory] = useState('');
    const [categoryDelete, setCategoryDelete] = useState(scategoryList[0]?.name);

    const changeCategoryEdit = useCallback(value => {
        setCategoryEdit(value.key);
    }, []);
    const changeNewCategory = useCallback((e) => {
        setNewCategory(e.target.value);
    }, []);
    
    const changeCategoryDelete = useCallback(value => {
        setCategoryDelete(value.key);
    }, []);

    const editScategory = useCallback(() => {
        if (confirm('정말 수정하시겠습니까?')) {
            dispatch({
                type: EDIT_SCATEGORY_REQUEST,
                data: categoryEdit,
                newCategory,
            });    
        }
    }, [categoryEdit, newCategory]);
    const removeScategory = useCallback(() => {
        if (confirm('정말 삭제하시겠습니까?')) {
            dispatch({
                type: REMOVE_SCATEGORY_REQUEST,
                data: categoryDelete,
            });
        }
    }, [categoryDelete]);

    return (
        <StyledCard>
            <h1>작은 카테고리 변경</h1>
            <Form onFinish={editScategory}>
                <Select
                    style={{ width: '950px' }}
                    labelInValue
                    defaultValue={{ key: categoryEdit }}
                    onChange={changeCategoryEdit}
                >
                    {scategoryList.map((c: { name: string }) => (
                        <Select.Option key={c.name} value={c.name}>{c.name}</Select.Option>
                    ))}
                </Select>
                <Input value={newCategory} onChange={changeNewCategory}/>
                <Button htmlType="submit" type="primary">
                    수정
                </Button>
            </Form>
            <h1>작은 카테고리 삭제</h1>
            <Form onFinish={removeScategory}>
                <Select
                    style={{ width: '950px' }}
                    labelInValue
                    defaultValue={{ key: categoryDelete }}
                    onChange={changeCategoryDelete}
                >
                    {scategoryList.map((c: { name: string }) => (
                        <Select.Option key={c.name} value={c.name}>{c.name}</Select.Option>
                    ))}
                </Select>
                <Button htmlType="submit" type="primary">
                    삭제
                </Button>
            </Form>
        </StyledCard>
    );
}

export default BcategorySetting;