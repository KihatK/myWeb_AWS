import React, { useCallback } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Button } from 'antd';

import CategoryList from './CategoryList';
import { RootState } from '../reducers';
import { ADD_BCATEGORY_REQUEST, BcategoryType } from '../reducers/category';
import { StyledButton } from '../style/containers/CategoryDrawer';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const CategoryDrawer = ({ visible, onClose }: Props) => {
    const dispatch = useDispatch();
    const { bcategory, isAddingBcategory } = useSelector((state: RootState) => state.category);
    const admin = useSelector((state: RootState) => state.user.me?.admin);

    const addCategory = useCallback(() => {
        const newCategory: string | null = prompt('카테고리의 이름을 입력하세요');
        const order = bcategory.length + 1;
        dispatch({
            type: ADD_BCATEGORY_REQUEST,
            data: newCategory,
            order,
        });
    }, [bcategory]);

    return (
        <Drawer
            title="카테고리"
            placement="left"
            closable={true}
            onClose={onClose}
            visible={visible}
        >
            <Link href="/">
                <a>Home</a>
            </Link>
            {bcategory.map((c: BcategoryType) => <CategoryList key={c.name} category={c} />)}
            {admin && 
                (
                    <StyledButton onClick={addCategory} loading={isAddingBcategory}>
                    +
                    </StyledButton>
                )
            }
        </Drawer>
    );
};

export default CategoryDrawer;