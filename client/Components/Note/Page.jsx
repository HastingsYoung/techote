import React,{Component} from 'react';
import ContentEditable from './ContentEditable.jsx';

export default class Page extends Component {
    constructor(props) {
        super(props);
    }

    onCueChange(txt) {
        let content = this.props.cueColumn;
        content[0] = txt;
        this.props.onPageChange(this.props.index, {
            cueColumn: content,
            noteContent: this.props.noteContent,
            summary: this.props.summary
        });
    }

    onNoteChange(txt) {
        let content = this.props.noteContent;
        content[0] = txt;
        this.props.onPageChange(this.props.index, {
            cueColumn: this.props.cueColumn,
            noteContent: content,
            summary: this.props.summary
        });
    }

    onSummaryChange(txt) {
        let content = this.props.cueColumn;
        content[0] = txt;
        this.props.onPageChange(this.props.index, {
            cueColumn: content,
            noteContent: this.props.noteContent,
            summary: txt
        });
    }

    render() {
        return (
            <div className="note">
                <div className="notebook">
                    <div className="cue-column">
                        <div className="cue-title">
                            Cue Column
                        </div>
                        <ContentEditable className="cue-text" onChange={this.onCueChange.bind(this)}>
                            {this.props.cueColumn}
                        </ContentEditable>
                    </div>
                    <div className="note-content">
                        <div className="note-title">
                            Note Taking Column
                        </div>
                        <ContentEditable className="note-text" onChange={this.onNoteChange.bind(this)}>
                            {this.props.noteContent}
                        </ContentEditable>
                    </div>
                </div>
                <div className="summary">
                    <div className="summary-title">
                        Summary
                    </div>
                    <ContentEditable className="summary-text" onChange={this.onSummaryChange.bind(this)}>
                        {this.props.summary}
                    </ContentEditable>
                </div>
            </div>)
    }
}