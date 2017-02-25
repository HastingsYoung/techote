import React,{Component} from 'react';
import './markdownview.css';
let marked = require('marked');

export default class MarkdownView extends Component {
    constructor(props) {
        super(props);
    }

    renderPages() {
        let text = "";
        this.props.pages.forEach((p, i)=> {
            if(typeof p.noteContent == 'string'){
                text += p.noteContent;
                return;
            }
            var txt = p.noteContent.innerHTML.toString().replace(/<\/?.+?>/g, "");
            text += txt;
        });
        return text;
    }

    render() {
        return <div className="markdown-view">
            <div className="markdown-view-btns">
                <div className="markdown-view-btn" onClick={this.props.switchView}>
                    <i className="material-icons">border_color</i>
                </div>
            </div>
            <div className="markdown-view-content"
                 dangerouslySetInnerHTML={{__html:marked(this.renderPages())}}></div>
        </div>;
    }
}