import React,{Component} from 'react';
let css = require('./markdownview.css');
let marked = require('marked');
marked.setOptions({
    gfm: true,
    tables: true
});
let renderer = new marked.Renderer();

renderer.heading = function (text, level) {
    var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return '<h' + level + '>' +
        escapedText + '</h' + level + '>';
}

export default class MarkdownView extends Component {
    constructor(props) {
        super(props);
    }

    _onDownload() {
        let dom = document.getElementById("md-content");
        let divContent = dom.innerHTML;
        const width = window.screen.width;
        const height = dom.clientHeight;
        var data = "<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'>" +
            "<foreignObject width='100%' height='100%'>" +
            "<div xmlns='http://www.w3.org/1999/xhtml'> <style>" + css.innerText + "</style> " +
            "<div class='markdown-view'><div class='markdown-view-content'>" + divContent + "</div></div>" +
            "</div>" +
            "</foreignObject>" +
            "</svg>";
        let file = document.createElement("a");
        let blob = new Blob([data], {type: "image/svg+xml"});
        file.href = URL.createObjectURL(blob);
        file.download = "Technote-bundle";
        document.body.appendChild(file);
        file.click();
        document.body.removeChild(file);
    }

    renderPages() {
        let text = "";
        this.props.pages.forEach((p, i)=> {
            if (typeof p.noteContent == 'string') {
                text += p.noteContent.replace(/<\/?.+?>/g, "\r");
                return;
            }
            var txt = p.noteContent.innerHTML.toString().replace(/<\/?.+?>/g, "");
            text += txt;
        });
        return text;
    }

    render() {
        let md = this.renderPages();
        console.log(css);
        return <div className="markdown-view">
            <div className="markdown-view-btns">
                <div className="markdown-view-btn" onClick={this.props.switchView}>
                    <i className="material-icons">border_color</i>
                </div>
                <div className="markdown-view-btn" onClick={this._onDownload.bind(this)}>
                    <i className="material-icons">cloud_download</i>
                </div>
            </div>
            <div className="markdown-view-content" id="md-content"
                 dangerouslySetInnerHTML={{__html:marked(md,{renderer:renderer})}}></div>
        </div>;
    }
}