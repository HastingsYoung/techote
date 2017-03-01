import React,{Component} from 'react';
import ContentEditable from './ContentEditable.jsx';

export default class Page extends Component {
    constructor(props) {
        super(props);
    }

    onCueChange(node, row, char, func) {
        this.props.onPageChange(this.props.index, {
            cueColumn: node.innerHTML,
            noteContent: this.props.noteContent,
            summary: this.props.summary
        }, 0, row, char, func);
    }

    onNoteChange(node, row, char, func) {
        this.props.onPageChange(this.props.index, {
            cueColumn: this.props.cueColumn,
            noteContent: node.innerHTML,
            summary: this.props.summary
        }, 1, row, char, func);
    }

    onSummaryChange(node, row, char, func) {
        this.props.onPageChange(this.props.index, {
            cueColumn: this.props.cueColumn,
            noteContent: this.props.noteContent,
            summary: node.innerHTML
        }, 2, row, char, func);
    }

    render() {
        return (
            <div className="note">
                <div className="notebook">
                    <div className="cue-column">
                        <div className="cue-title">
                            Cue Column
                        </div>
                        <ContentEditable ref={"cue"} className="cue-text" onChange={this.onCueChange.bind(this)}
                                         html={this.props.cueColumn}
                                         onFocus={()=>{
                                            this.props.onFocus(this.props.index,0,this.props.ances.state.currentFocus.row,this.props.ances.state.currentFocus.char);
                                         }}
                                         onBlur={()=>{
                                            this.props.onBlur(this.props.index,0,this.props.ances.state.currentFocus.row,this.props.ances.state.currentFocus.char);
                                         }} page={this.props.index} region={0} ances={this.props.ances}>
                        </ContentEditable>
                    </div>
                    <div className="note-content">
                        <div className="note-title">
                            Note Taking Column
                        </div>
                        <ContentEditable ref={"note"} className="note-text" onChange={this.onNoteChange.bind(this)}
                                         html={this.props.noteContent} onFocus={()=>{
                                            this.props.onFocus(this.props.index,1,this.props.ances.state.currentFocus.row,this.props.ances.state.currentFocus.char);
                                         }}
                                         onBlur={()=>{
                                            this.props.onBlur(this.props.index,1,this.props.ances.state.currentFocus.row,this.props.ances.state.currentFocus.char);
                                         }} page={this.props.index} region={1} ances={this.props.ances}>
                        </ContentEditable>
                    </div>
                </div>
                <div className="summary">
                    <div className="summary-title">
                        Summary
                    </div>
                    <ContentEditable ref={"summary"} className="summary-text" onChange={this.onSummaryChange.bind(this)}
                                     html={this.props.summary} onFocus={()=>{
                                            this.props.onFocus(this.props.index,2,this.props.ances.state.currentFocus.row,this.props.ances.state.currentFocus.char);
                                         }} onBlur={()=>{
                                            this.props.onBlur(this.props.index,2,this.props.ances.state.currentFocus.row,this.props.ances.state.currentFocus.char);
                                         }} page={this.props.index} region={2} ances={this.props.ances}>
                    </ContentEditable>
                </div>
            </div>)
    }
}