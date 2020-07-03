import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Select } from 'antd';

import { RootState } from '../reducers';
import { CHANGE_BCATEGORY_ORDER_REQUEST } from '../reducers/category';
import { StyledCard } from '../style/containers/BcategoryOrder';
import { BcategoryType } from '../util/category';

const BcategoryOrder = () => {
    const dispatch = useDispatch();
    const { bcategory } = useSelector((state: RootState) => state.category);

    const [bcategory1, setBcategory1] = useState(bcategory[0]?.name);
    const [bcategory2, setBcategory2] = useState(bcategory[1]?.name);

    const changeBcategory1 = useCallback(value => {
        setBcategory1(value.key);
    }, []);
    const changeBcategory2 = useCallback(value => {
        setBcategory2(value.key);
    }, []);

    const bcategoryOrder = useCallback(() => {
        dispatch({
            type: CHANGE_BCATEGORY_ORDER_REQUEST,
            data: {
                bcategory1,
                bcategory2,
            },
        });
    }, [bcategory1, bcategory2]);

    return (
        <StyledCard>
            <Form>
                <h1>큰 카테고리 순서 변경</h1>
                <Select
                    style={{ width: '950px' }}
                    labelInValue
                    defaultValue={{ key: bcategory1 }}
                    onChange={changeBcategory1}
                >
                    {bcategory.map((c: BcategoryType) => (
                        <Select.Option key={c.name} value={c.name}>{c.name}</Select.Option>
                    ))}
                </Select>
                <Select
                    style={{ width: '950px' }}
                    labelInValue
                    defaultValue={{ key: bcategory2 }}
                    onChange={changeBcategory2}
                >
                    {bcategory.map((c: BcategoryType) => (
                        <Select.Option key={c.name} value={c.name}>{c.name}</Select.Option>
                    ))}
                </Select>
                <Button onClick={bcategoryOrder} type="primary">변경</Button>
            </Form>
        </StyledCard>
    );
};

export default BcategoryOrder;