import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { useDispatch, useSelector } from 'react-redux';
import withReduxSaga from 'next-redux-saga';

import wrapper from '../store/makeStore';
import AppLayout from '../components/AppLayout';
import { RootState } from '../reducers';
import { LOAD_USER_REQUEST } from '../reducers/user';
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

const App = ({ Component }: Props) => {
    const dispatch = useDispatch();
    const { scategoryList } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        dispatch({
            type: GET_BCATEGORY_REQUEST,
        });
    }, [scategoryList]);

    useEffect(() => {
        dispatch({
            type: LOAD_USER_REQUEST,
        });
    }, []);

    return (
        <>
            <Head>
                <title>Kihat's Blog</title>
                <meta charSet="utf-8"/>
                <link ref='stylesheet' href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.3/antd.css" />
                <link ref='stylesheet' href="../prismjs/prism.css" />
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
        </>
    );
}

export default wrapper.withRedux(withReduxSaga(App));