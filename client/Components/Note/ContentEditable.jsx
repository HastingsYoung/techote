import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default class ContentEditable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // todo change to specific row and char
        // todo the tracking of row and char should not be executed at onBlur/onFocus but at onChange
        // todo find out how to get caret when hit onChange
        return <div className={this.props.className} contentEditable="true" onInput={()=>{
                            let el = ReactDOM.findDOMNode(this);
                            let range = document.createRange();
                            let sel = window.getSelection();
                            this.props.onChange(el);
                            // sel.getRangeAt(0) return the range, find out how to get row and char from range object
                            // this.props.onBlur();
                            if ((this.props.ances.state.currentFocus.page == this.props.page) && (this.props.ances.state.currentFocus.region == this.props.region)) {
                                range.setStart(el.childNodes[this.props.ances.state.currentFocus.row], this.props.ances.state.currentFocus.char);
                                range.collapse(true);
                                sel.removeAllRanges();
                                sel.addRange(range);
                                console.log(this.props.ances.state.currentFocus);
                            }
                        }} onFocus={this.props.onFocus} dangerouslySetInnerHTML={{__html:this.props.html}}>
            {this.props.children}
        </div>
    }

    componentDidMount() {

    }
}