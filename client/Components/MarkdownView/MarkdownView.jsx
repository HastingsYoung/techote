import React,{Component} from 'react';
let marked = require('marked');

export default class MarkdownView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="markdown-view"
                    dangerouslySetInnerHTML={{__html:marked(this.props.text?this.props.text:"")}}></div>;
    }
}