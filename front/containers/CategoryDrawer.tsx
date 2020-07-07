import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from 'antd';

import { RootState } from '../reducers';
import { ADD_BCATEGORY_REQUEST } from '../reducers/category';
import { StyledButton } from '../style/containers/CategoryDrawer';
import { BcategoryType } from '../util/category';
import { CategoryDrawerProps } from '../util/props';

const CategoryList = dynamic(() => import('./CategoryList'), { loading: () => <p>로딩중...</p>, ssr: false });

const CategoryDrawer = ({ visible, onClose }: CategoryDrawerProps) => {
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