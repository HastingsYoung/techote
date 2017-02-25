import React,{Component} from 'react';

export default class Page extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
        <div className="note">
            <div className="notebook">
                <div className="cue-column">
                    <div className="cue-title">
                        Cue Column
                    </div>
                    <div className="cue-text">
                        {this.props.cueColumn}
                    </div>
                </div>
                <div className="note-content">
                    <div className="note-title">
                        Note Taking Column
                    </div>
                    <div className="note-text">
                        {this.props.noteContent}
                    </div>
                </div>
            </div>
            <div className="summary">
                <div className="summary-title">
                    Summary
                </div>
                <div className="summary-text">
                    {this.props.summary}
                </div>
            </div>
        </div>)
    }
}