import React,{Component} from 'react';
import './messagebox.css';

export default class MessageBox extends Component {
    constructor(props) {
        super(props);
    }

    renderTypes() {
        let types = "message-box";
        if (this.props.type == "warn")
            types += " warn";
        if (this.props.type == "error")
            types += " error";
        if (this.props.type == "success")
            types += " success";
        return types;
    }

    render() {
        return (<div className={this.renderTypes()}>
            {this.props.children}
        </div>);
    }
}

MessageBox.show = (content = "", type = "normal", delay = 3000)=> {
    let dom = document.querySelector('.message-box');
    dom.innerHTML = content;
    if (type && type != "warn" && type != "error" && type != "normal" && type != "success")
        throw new Error("MessageBox: type not recognizable error");
    dom.classList.toggle(type);
    setTimeout(function () {
        dom.classList.toggle(type);
    }, delay);
};
