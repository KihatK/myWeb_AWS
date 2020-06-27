import Error from 'next/error';
import React from 'react';

const MyError = ({ statusCode }: any) => {
    return (
        <div>
            <h1>{statusCode} 에러발생</h1>
        </div>
    )
}

MyError.defaultProps = {
    statusCode: 400,
}

export default MyError;
