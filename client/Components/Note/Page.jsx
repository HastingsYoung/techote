import React,{Component} from 'react';
import ContentEditable from './ContentEditable.jsx';

export default class Page extends Component {
    constructor(props) {
        super(props);
    }

    onCueChange(node) {
        this.props.onPageChange(this.props.index, {
            cueColumn: node.innerHTML,
            noteContent: this.props.noteContent,
            summary: this.props.summary
        });
    }

    onNoteChange(node) {
        this.props.onPageChange(this.props.index, {
            cueColumn: this.props.cueColumn,
            noteContent: node.innerHTML,
            summary: this.props.summary
        });
    }

    onSummaryChange(node) {
        this.props.onPageChange(this.props.index, {
            cueColumn: this.props.cueColumn,
            noteContent: this.props.noteContent,
            summary: node.innerHTML
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
                        <ContentEditable className="cue-text" onChange={this.onCueChange.bind(this)} html={this.props.cueColumn}>
                        </ContentEditable>
                    </div>
                    <div className="note-content">
                        <div className="note-title">
                            Note Taking Column
                        </div>
                        <ContentEditable className="note-text" onChange={this.onNoteChange.bind(this)} html={this.props.noteContent}>
                        </ContentEditable>
                    </div>
                </div>
                <div className="summary">
                    <div className="summary-title">
                        Summary
                    </div>
                    <ContentEditable className="summary-text" onChange={this.onSummaryChange.bind(this)} html={this.props.summary}>
                    </ContentEditable>
                </div>
            </div>)
    }
}