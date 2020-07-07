import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { AppProps } from 'next/app';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import wrapper from '../store/makeStore';
import { RootState } from '../reducers';
import { GET_BCATEGORY_REQUEST } from '../reducers/category';

import 'antd/dist/antd.css';  //antd 스타일 적용
import '../css/style.css';  //body 태그에 #F0F0F0 적용
import 'draft-js/dist/Draft.css';  //기본 draft-js css 적용
import 'draft-js-static-toolbar-plugin/lib/plugin.css';  //static toolbar css 적용
import 'draft-js-alignment-plugin/lib/plugin.css';  //alignmenttool css 적용
import 'draft-js-code/demo/editor.css';  //draft.css 외에 필요한 css 여기서 수정
import 'prismjs/themes/prism.css'; // add prism.css to add highlights

interface Props extends AppProps {
    Component: React.FC,
};

const AppLayout = dynamic(() => import('../components/AppLayout'));

const App = ({ Component }: Props) => {
    const dispatch = useDispatch();
    const { scategoryList } = useSelector((state: RootState) => state.category);

    const countRef = useRef(false);

    useEffect(() => {
        if (!countRef.current) {
            countRef.current = true;
        }
        else {
            dispatch({
                type: GET_BCATEGORY_REQUEST,
            });
        }
    }, [scategoryList]);

    return (
        <>
            <Helmet
                title="Kihat's Blog"
                htmlAttributes={{ lang: 'ko' }}
                meta={[{
                    charSet: 'UTF-8',
                }, {
                    name: 'viewport',
                    content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
                }, {
                    name: 'description', content: 'Kihat의 Blog',
                }, {
                    name: 'og:title', content: 'Kihat\'s Blog',
                }, {
                    name: 'og:description', content: 'Kihat의 Blog',
                }, {
                    name: 'og:type', content: 'website',
                }, {
                    name: 'og:image', content: '',
                }]}
                link={[{
                    rel: 'shortcut icon', href: '',
                }]}
            />
            <AppLayout>
                <Component/>
            </AppLayout>
        </>
    );
}

export default wrapper.withRedux(App);