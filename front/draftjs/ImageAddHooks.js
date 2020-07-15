import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Form } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

import { UPLOAD_IMAGE_REQUEST } from '../reducers/image';

const ConfirmBtn = styled.button`
    &&:focus {
        outline: 0;
    }
    &&:hover {
        background: #f3f3f3;
    }
    &&:active {
        background: #e6e6e6;
    }
`;
const AddImageBtn = styled.button`
    &&:focus {
        outline: 0;
    }
    &&:hover {
        background: #f3f3f3;
    }
    &&:active {
        background: #e6e6e6;
    }
    & {
        position: relative;
        top: -4px;
        box-sizing: border-box;
        background: #fbfbfb;
        border: 1px solid #fff;
        padding: 0;
        color: #888;
        margin: 0;
        cursor: pointer;
        width: 1.5em;
        font-size: 1.5em;
        margin: 0;
    }
`;
const PressedBtn = styled.button`
    && {
        position: relative;
        top: -4px;
        box-sizing: border-box;
        background: #fbfbfb;
        border: 1px solid #fff;
        padding: 0;
        color: #888;
        margin: 0;
        cursor: pointer;
        width: 1.5em;
        font-size: 1.5em;
        margin: 0;
    }
`;

const ImageAdd = ({ onChange, editorState, modifier }) => {
    // Start the popover closed
    const dispatch = useDispatch();
    const { imageUrl } = useSelector(state => state.image);

    const [url, setUrl] = useState('');
    const [open, setOpen] = useState(false);

    // When the popover is open and users click anywhere on the page,
    // the popover should close
    useEffect(() => {
        document.addEventListener('click', closePopover);
        return () => {
            document.removeEventListener('click', closePopover);
        }
    }, []);

    // Note: make sure whenever a click happens within the popover it is not closed
    const onPopoverClick = () => {
    }

    const openPopover = () => {
        if (!open) {
            setOpen(true);
        }
    };

    const closePopover = () => {
        if (open) {
            setOpen(false);
        }

    };

    const addImage = useCallback(() => {
        onChange(modifier(editorState, `${imageUrl}`));
        setOpen(false);
    }, [editorState, imageUrl]);

    const changeUrl = useCallback((evt) => {
        console.log('file', evt.target.files);
        setUrl(evt.target.value);
        const formData = new FormData();
        [].forEach.call(evt.target.files, (f) => {
            formData.append('image', f);
        });
        dispatch({
            type: UPLOAD_IMAGE_REQUEST,
            data: formData,
        });
    }, []);

    const popoverClassName = open ?
        {
            marginTop: '10px',
            background: '#FFF',
            position: 'absolute',
            height: '54px',
            width: '300px',
            borderRadius: '2px',
            padding: '10px',
            boxShadow: '0px 4px 30px 0px rgba(220,220,220,1)',
            zIndex: '1000',
        } :
        {
            display: 'none',
        };
    const buttonClassName = open ?
        {
            composes: 'addImageButton',
            background: '#ededed',
        } :
        {
            boxSizing: 'border-box',
            background: '#fff',
            border: '1px solid #ddd',
            padding: 0,
            color: '#888',
            margin: 0,
            borderRadius: '1.5em',
            cursor: 'pointer',
            height: '1.5em',
            width: '2.5em',
            fontSize: '1.5em',
            lineHeight: '1.2em',
            margin: 0,
        };

    return (
        <div style={{ background: '#FFF', display: 'inline-block' }}>
            {open
                ? <PressedBtn onMouseUp={openPopover} type="button">
                    <FileImageOutlined />
                </PressedBtn>
                : <AddImageBtn onMouseUp={openPopover} type="button">
                    <FileImageOutlined />
                </AddImageBtn>
            }
            <div
                style={popoverClassName}
                onClick={onPopoverClick}
            >
                <Form encType="multipart/form-data" style={{ position: 'relative' }}>
                    <input
                        type="file"
                        placeholder="Paste the image url …"
                        style={
                            {
                                boxSizing: 'border-box',
                                border: '1px solid #ddd',
                                cursor: 'text',
                                padding: '4px',
                                width: '78%',
                                borderRadius: '2px',
                                marginBottom: '1em',
                                boxShadow: 'inset 0px 1px 8px -3px #ABABAB',
                                background: '#fefefe',
                            }
                        }
                        onChange={changeUrl}
                        value={url}
                    />
                    <ConfirmBtn
                        style={
                            {
                                position: 'absolute',
                                right: '0px',
                                bottom: '5px',
                                boxSizing: 'border-box',
                                background: '#fff',
                                border: '1px solid #ddd',
                                padding: 0,
                                color: '#888',
                                margin: 0,
                                borderRadius: '2.1em',
                                cursor: 'pointer',
                                height: '2.1em',
                                width: '18%',
                                fontSize: '1em',
                                lineHeight: '2.1em',
                                margin: 0,
                                marginLeft: '4%',
                            }
                        }
                        type="button"
                        onClick={addImage}
                    >
                        Add
                    </ConfirmBtn>
                </Form>
            </div>
        </div>
    );
}

export default ImageAdd;