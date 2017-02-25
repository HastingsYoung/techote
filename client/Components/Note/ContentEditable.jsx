import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default class ContentEditable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={this.props.className} contentEditable="true" onInput={()=>{
                            let node = ReactDOM.findDOMNode(this);
                            this.props.onChange(node);
                        }} onFocus={this.props.onFocus} dangerouslySetInnerHTML={{__html:this.props.html}}>
            {this.props.children}
        </div>
    }
}