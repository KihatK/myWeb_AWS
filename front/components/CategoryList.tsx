import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../reducers';
import { ADD_SCATEGORY_REQUEST } from '../reducers/category';

interface Props {
    category: {
        name: string,
        Scategories: string[],
    }
};

const DragA = styled.a`
    && {
        -moz-user-select: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
    }
`;

const CategoryList = ({ category }: any) => {
    const [categoryOpen, setCategoryOpen] = useState(false);

    const dispatch = useDispatch();
    const { bcategory } = useSelector((state: RootState) => state.category);
    const admin = useSelector((state: RootState) => state.user.me?.admin);

    const bcategoryIndex = bcategory.findIndex(v => v.name === category.name);

    const clickCategory = useCallback(() => {
        if (categoryOpen) {
            return setCategoryOpen(false);
        }
        return setCategoryOpen(true);
    }, [categoryOpen]);

    const addCategory = useCallback(() => {
        const newCategory: string | null = prompt('카테고리의 이름을 입력하세요');
        const order = category.Scategories ? category.Scategories.length + 1 : 1;
        dispatch({
            type: ADD_SCATEGORY_REQUEST,
            Bcategory: category.name,
            data: newCategory,
            order,
        });
    }, [category]);

    return (
        <>
            <DragA onClick={clickCategory}><p style={{ fontSize: '25px', marginBottom: '0px' }}>
                {category.name}
            </p></DragA>
            {
                categoryOpen &&
                <div>
                    {bcategory[bcategoryIndex]?.Scategories?.map(c => 
                        <div key={c.name}>
                            &nbsp;&nbsp;
                            <Link href="/category/[category]" as={`/category/${c.name.replace(/\s/gi, "")}`}>
                                <a>{c.name}</a>
                            </Link>
                            <br/>
                        </div>
                    )}
                    &nbsp;&nbsp;
                    {admin && 
                        (
                            <a onClick={addCategory}>+</a>
                        )
                    }
                </div>
            }
        </>
    );
}

export default CategoryList;