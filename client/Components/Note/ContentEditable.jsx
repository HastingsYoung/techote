import React,{Component} from 'react';
import ReactDOM from 'react-dom';

export default class ContentEditable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // todo change to specific row and char
        // todo the tracking of row and char should not be executed at onBlur/onFocus but at onChange
        // todo find out how to get caret when hit onInput
        return <div className={this.props.className} contentEditable="true" onInput={()=>{
                            let el = ReactDOM.findDOMNode(this);
                            let range = document.createRange();
                            let sel = window.getSelection();
                            let self = this;
                            let pms = new Promise(function(resolve,reject){
                                let currNode = sel.anchorNode;
                                 if(!currNode.childNodes.length){
                                    currNode = currNode.parentNode;
                                 }
                                let k = Array.prototype.indexOf.call(el.childNodes,currNode);
                                self.props.onChange(el,k,sel.anchorOffset, function(){
                                    resolve();
                                });
                            });
                            pms.then(function(){
                                if ((self.props.ances.state.currentFocus.page == self.props.page) && (self.props.ances.state.currentFocus.region == self.props.region)) {
                                    try{
                                        let startNode = el.childNodes[self.props.ances.state.currentFocus.row];
                                        range.setStart(startNode, self.props.ances.state.currentFocus.char);
                                    }catch(err){
                                        let startNode = el.childNodes[self.props.ances.state.currentFocus.row];
                                        startNode = startNode.childNodes[0];
                                        range.setStart(startNode, startNode.length);
                                    }
                                    range.collapse(true);
                                    sel.removeAllRanges();
                                    sel.addRange(range);
                                }
                            });
                        }} onFocus={this.props.onFocus} dangerouslySetInnerHTML={{__html:this.props.html}}>
            {this.props.children}
        </div>
    }
}