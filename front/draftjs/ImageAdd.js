import React, { Component } from 'react';
import styled from 'styled-components';
import { FileImageOutlined } from '@ant-design/icons';

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

export default class ImageAdd extends Component {
    // Start the popover closed
    state = {
        url: '',
        open: false,
    };

    // When the popover is open and users click anywhere on the page,
    // the popover should close
    componentDidMount() {
        document.addEventListener('click', this.closePopover);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closePopover);
    }

    // Note: make sure whenever a click happens within the popover it is not closed
    onPopoverClick = () => {
        this.preventNextClose = true;
    }

    openPopover = () => {
        if (!this.state.open) {
            this.preventNextClose = true;
            this.setState({
                open: true,
            });
        }
    };

    closePopover = () => {
        if (!this.preventNextClose && this.state.open) {
            this.setState({
                open: false,
            });
        }

        this.preventNextClose = false;
    };

    addImage = () => {
        const { editorState, onChange } = this.props;
        onChange(this.props.modifier(editorState, this.state.url));
        this.state.open = false;
    };

    changeUrl = (evt) => {
        this.setState({ url: evt.target.value });
    }

    render() {
        const popoverClassName = this.state.open ?
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
        const buttonClassName = this.state.open ?
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
                {this.state.open
                    ? <PressedBtn onMouseUp={this.openPopover} type="button">
                        <FileImageOutlined />
                    </PressedBtn>
                    : <AddImageBtn onMouseUp={this.openPopover} type="button">
                        <FileImageOutlined />
                    </AddImageBtn>
                }
                <div
                    style={popoverClassName}
                    onClick={this.onPopoverClick}
                >
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
                        onChange={this.changeUrl}
                        value={this.state.url}
                    />
                    <ConfirmBtn
                        style={
                            {
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
                        onClick={this.addImage}
                    >
                        Add
                    </ConfirmBtn>
                </div>
            </div>
        );
    }
}