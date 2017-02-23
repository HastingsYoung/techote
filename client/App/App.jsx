import React,{Component} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import './react-draft-wysiwyg.css';
import MarkdownView from '../Components/MarkdownView/MarkdownView.jsx';
import CheckList from '../Components/CheckList/CheckList.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);
        //this.state = {editorState: EditorState.createEmpty()};
        //this.onEditorStateChange = (editorState) => {
        //    this.setState({
        //        editorState,
        //    });
        //}
    }


    render() {
        return (<div className="app">
            <MarkdownView text={"# Markdown\n\n\n\n ### Marked"}></MarkdownView>
            <CheckList></CheckList>
        </div>);
    }
}