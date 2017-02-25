import React,{Component} from 'react';

export default class Page extends Component {
    constructor(props) {
        super(props);
    }

    onCueChange(txt) {

    }

    onNoteChange(txt) {

    }

    onSummaryChange(txt) {

    }

    render() {
        // todo cue draft.js plain text editor
        // todo text content draft.js plain text editor
        return (
            <div className="note">
                <div className="notebook">
                    <div className="cue-column">
                        <div className="cue-title">
                            Cue Column
                        </div>
                        <div className="cue-text" contentEditable="true" onChange={(evt)=>{
                            this.onCueChange();
                        }}>
                            {this.props.cueColumn}
                        </div>
                    </div>
                    <div className="note-content">
                        <div className="note-title">
                            Note Taking Column
                        </div>
                        <div className="note-text" contentEditable="true" onchange={(evt)=>{
                            this.onNoteChange();
                        }}>
                            {this.props.noteContent}
                        </div>
                    </div>
                </div>
                <div className="summary">
                    <div className="summary-title">
                        Summary
                    </div>
                    <div className="summary-text" contentEditable="true" onChange={(evt)=>{
                        this.onSummaryChange();
                    }}>
                        {this.props.summary}
                    </div>
                </div>
            </div>)
    }
}