import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default class ContentEditable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={this.props.className} contentEditable="true" onInput={()=>{
                        let txt = ReactDOM.findDOMNode(this).innerText;
                            this.props.onChange(txt);
                        }} onFocus={this.props.onFocus}>
            {this.props.children}
        </div>
    }
}