import React, { useState, useEffect } from 'react';

const TimeCheck = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        let interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <>
            <span style={{ verticalAlign: 'middle', position: 'absolute', top: '1px', right: '30px'}}>
                {time.getFullYear()}-{time.getMonth()+1 >=10 
                    ? time.getMonth()+1 
                    : `0${time.getMonth()+1}`}-{time.getDate() >= 10 ? time.getDate() : `0${time.getDate()}`}
            </span>
            <span style={{ verticalAlign: 'middle', position: 'absolute', top: '19px', right: '34px' }}>
                {time.getHours() > 12 ? `오후 ${time.getHours()-12}` : `오전 ${time.getHours()}`}:
                {time.getMinutes() >= 10 ? time.getMinutes() : `0${time.getMinutes()}`}
            </span>
        </>
    );
}

export default TimeCheck;