import React, { useState, useRef, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'antd';

import Draft, { EditorState, convertFromRaw, RichUtils, convertFromHTML, ContentState } from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons';
import createStyles from 'draft-js-custom-styles';
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import CodeUtils from 'draft-js-code';
import Prism from 'prismjs';
import createPrismPlugin from 'draft-js-prism-plugin';

import { stateToHTML } from 'draft-js-export-html'

import ImageAdd from '../draftjs/ImageAddHooks';
import { EDIT_POST_REQUEST } from '../reducers/post';

const HeadBtnDiv = styled.div`
    && {
        display: inline-block;
    }
    & > button {
        background: #fbfbfb;
        color: #888;
        font-size: 18px;
        border: 0;
        padding-top: 5px;
        vertical-align: bottom;
        height: 34px;
        width: 36px;
    }
    & > button:hover,
    & > button:focus {
        background: #f3f3f3;
    }
`;
const EditorStyleDiv = styled.div`
    && .DraftEditor-root {
        min-height: 400px;
        margin-bottom: 100px;
    }
    && {
        box-sizing: border-box;
        border: 1px solid #ddd;
        cursor: text;
        padding: 16px;
        border-radius: 2px;
        margin-bottom: 2em;
        box-shadow: inset 0px 1px 8px -3px #ABABAB;
        background: #fefefe;
    }
`;

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const decorator = composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
);
const linkPlugin = createLinkPlugin();
const imagePlugin = createImagePlugin({ decorator });
const prismPlugin = createPrismPlugin({
    // It's required to provide your own instance of Prism
    prism: Prism
});
const plugins = [ toolbarPlugin, imagePlugin, focusPlugin, resizeablePlugin, 
    blockDndPlugin, alignmentPlugin, linkPlugin, prismPlugin
];

const { styles, customStyleFn, exporter } = createStyles(['font-size', 'color', 'text-transform'], 'CUSTOM_');

const HeadlinesPicker = (props) => {
    useEffect(() => {
        setTimeout(() => { window.addEventListener('click', onWindowClick); });
        return () => {
            window.removeEventListener('click', onWindowClick);
        }
    }, []);

    const onWindowClick = () => {
        props.onOverrideContent(undefined);
    }

    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];

    return (
        <div>
            {buttons.map((Button, i) => // eslint-disable-next-line
                <Button key={i} {...props} />
            )}
        </div>
    );
}

const HeadlinesButton = (props) => {
    const onClick = () => {
        props.onOverrideContent(HeadlinesPicker);
    }

    return (
        <HeadBtnDiv>
                <button onClick={onClick}>
                    H
                </button>
        </HeadBtnDiv>
    );
}

const DraftEditor = ({ nickname, title, category, language, editing, uuid }) => {
    const dispatch = useDispatch();
    const blocksFromHTML = convertFromHTML(editing);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );

    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(state));
    
    const editor = useRef();

    //커멘드 사용 허용
    const handleKeyCommand = useCallback((command, editorState) => {
        let newState;

        if (CodeUtils.hasSelectionInBlock(editorState)) {
            newState = CodeUtils.handleKeyCommand(editorState, command);
        }

        if (!newState) {
            newState = RichUtils.handleKeyCommand(editorState, command);
        }

        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }, []);

    const keyBindingFn = useCallback((evt) => {
        if (!CodeUtils.hasSelectionInBlock(editorState)) return Draft.getDefaultKeyBinding(evt);

        const command = CodeUtils.getKeyBinding(evt);

        return command || Draft.getDefaultKeyBinding(evt);
    }, [editorState]);

    const handleReturn = useCallback((evt) => {
        if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

        setEditorState(CodeUtils.handleReturn(evt, editorState));
        return 'handled';
    }, [editorState]);

    const onTab = useCallback((evt) => {
        if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

        setEditorState(CodeUtils.onTab(evt, editorState));
        return 'handled';
    }, [editorState]);

    //custom style 적용
    const toggleFontSize = useCallback(fontSize => {
        const newEditorState = styles.fontSize.toggle(editorState, fontSize);

        return setEditorState(newEditorState);
    }, [editorState]);
    const removeFontSize = useCallback(() => {
        const newEditorState = styles.fontSize.remove(editorState);
     
        return setEditorState(newEditorState);
    }, [editorState]);
    const addFontSize = useCallback(val => () => {
        const newEditorState = styles.fontSize.add(editorState, val);
     
        return setEditorState(newEditorState);
    }, [editorState]);

    const toggleColor = useCallback(color => {
        const newEditorState = styles.color.toggle(editorState, color);
     
        return setEditorState(newEditorState);
    }, [editorState]);
    const toggleTextTransform = useCallback(color => {
        const newEditorState = styles.textTransform.toggle(editorState, color);
     
        return setEditorState(newEditorState);
    }, [editorState]);

    const options = useCallback(x => x.map(fontSize => {
        return <option key={fontSize} value={fontSize}>{fontSize}</option>;
    }), []);

    const clickPost = useCallback(() => {
        const inlineStyles = exporter(editorState);
        const html = stateToHTML(editorState.getCurrentContent(), { inlineStyles });
        dispatch({
            type: EDIT_POST_REQUEST,
            data: {
                title,
                nickname,
                content: html,
                scategory: category,
                language,
                uuid,
            },
        });
    }, [editorState]);

    // useEffect(() => {
    //     const inlineStyles = exporter(editorState);
    //     const html = stateToHTML(editorState.getCurrentContent(), { inlineStyles });
    //     console.log(html);
    // }, [editorState]);

    //syntax highlighting
    useEffect(() => {
        const selection = editorState.getSelection();
        const block = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey());
        if (block.getType() === "code-block") {
            const data = block.getData().merge({ language: 'javascript' });
            const newBlock = block.merge({ data });
            const newContentState = editorState.getCurrentContent().merge({
                blockMap: editorState
                    .getCurrentContent()
                    .getBlockMap()
                    .set(selection.getStartKey(), newBlock),
                selectionAfter: selection
            });
            setEditorState(EditorState.push(editorState, newContentState, "change-block-data"));
        }
    }, [editorState]);

    return (
        <>
            <div style={{ flex: '1 0 25%' }}>
                <button
                    onClick={removeFontSize}
                >
                    Remove FontSize
                </button>
                <button
                    onClick={addFontSize('24px')}
                >
                    Add FontSize
                </button>
                &nbsp;
                <select onChange={e => toggleFontSize(e.target.value)}>
                    {options(['12px', '24px', '36px', '50px', '72px'])}
                </select>
                <select onChange={e => toggleColor(e.target.value)}>
                    {options(['green', 'blue', 'red', 'purple', 'orange', 'black', 'white'])}
                </select>
                <select onChange={e => toggleTextTransform(e.target.value)}>
                    {options(['uppercase', 'capitalize', 'lowercase'])}
                </select>
            </div>
            <EditorStyleDiv>
                <Editor
                    placeholder="Write something!"
                    editorKey='foobaz'
                    editorState={editorState}
                    onChange={setEditorState}
                    keyBindingFn={keyBindingFn}
                    handleKeyCommand={handleKeyCommand}
                    handleReturn={handleReturn}
                    onTab={onTab}
                    ref={(element) => { editor.current = element; }}
                    plugins={plugins}
                    customStyleFn={customStyleFn}
                />
                <AlignmentTool/>
                <Toolbar>
                    {
                        // may be use React.Fragment instead of div to improve perfomance after React 16
                        (externalProps) => (
                            <React.Fragment>
                                <BoldButton {...externalProps} />
                                <ItalicButton {...externalProps} />
                                <UnderlineButton {...externalProps} />
                                <CodeButton {...externalProps} />
                                <Separator {...externalProps} />
                                <HeadlinesButton {...externalProps} />
                                <UnorderedListButton {...externalProps} />
                                <OrderedListButton {...externalProps} />
                                <BlockquoteButton {...externalProps} />
                                <CodeBlockButton {...externalProps} />
                                <Separator {...externalProps} />
                                <linkPlugin.LinkButton {...externalProps}/>
                                <ImageAdd
                                    editorState={editorState}
                                    onChange={setEditorState}
                                    modifier={imagePlugin.addImage}
                                />
                            </React.Fragment>
                        )
                    }
                </Toolbar>
            </EditorStyleDiv>
            <Button onClick={clickPost} style={{ float: 'right', marginBottom: '20px' }}>수정</Button>
        </>
    );
}

export default DraftEditor;