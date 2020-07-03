import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Input, Form, Button } from 'antd';

import { RootState } from '../reducers';
import { EDIT_BCATEGORY_REQUEST, REMOVE_BCATEGORY_REQUEST } from '../reducers/category';
import { StyledCard } from '../style/containers/CategorySetting';
import { BcategoryType } from '../util/category';

const BcategorySetting = () => {
    const dispatch = useDispatch();
    const { bcategory } = useSelector((state: RootState) => state.category);

    const [categoryEdit, setCategoryEdit] = useState(bcategory[0]?.name);
    const [newCategory, setNewCategory] = useState('');
    const [categoryDelete, setCategoryDelete] = useState(bcategory[0]?.name);

    const changeCategoryEdit = useCallback(value => {
        setCategoryEdit(value.key);
    }, []);
    const changeNewCategory = useCallback((e) => {
        setNewCategory(e.target.value);
    }, []);
    
    const changeCategoryDelete = useCallback(value => {
        setCategoryDelete(value.key);
    }, []);

    const editBcategory = useCallback(() => {
        if (confirm('정말 수정하시겠습니까?')) {
            dispatch({
                type: EDIT_BCATEGORY_REQUEST,
                data: categoryEdit,
                newCategory,
            });
        }
    }, [categoryEdit, newCategory]);
    const removeBcategory = useCallback(() => {
        if (confirm('정말 삭제하시겠습니까?')) {
            dispatch({
                type: REMOVE_BCATEGORY_REQUEST,
                data: categoryDelete,
            });
        }
    }, [categoryDelete]);

    return (
        <StyledCard>
            <h1>큰 카테고리 변경</h1>
            <Form onFinish={editBcategory}>
                <Select
                    style={{ width: '950px' }}
                    labelInValue
                    defaultValue={{ key: categoryEdit }}
                    onChange={changeCategoryEdit}
                >
                    {bcategory.map((c: BcategoryType) => (
                        <Select.Option key={c.name} value={c.name}>{c.name}</Select.Option>
                    ))}
                </Select>
                <Input value={newCategory} onChange={changeNewCategory}/>
                <Button htmlType="submit" type="primary">
                    수정
                </Button>
            </Form>
            <h1>큰 카테고리 삭제</h1>
            <Form onFinish={removeBcategory}>
                <Select
                    style={{ width: '950px' }}
                    labelInValue
                    defaultValue={{ key: categoryDelete }}
                    onChange={changeCategoryDelete}
                >
                    {bcategory.map((c: BcategoryType) => (
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