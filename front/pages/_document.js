import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
            });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                helmet: Helmet.renderStatic(),
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        }
        catch (error) {
            console.error(error);
        }
        finally {
            sheet.seal();
        }
    }

    render() {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();
        return (
            <Html {...htmlAttrs}>
                <Head>
                    {Object.values(helmet).map(el => el.toComponent())}
                </Head>
                <body {...bodyAttrs}>
                    <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019"/>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}