import React,{Component} from 'react';

export default class Page extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
        <div className="note">
            <div className="note-text">
                <div className="cue-column">
                    {this.props.cueColumn}
                </div>
                <div className="note-content">
                    {this.props.noteContent}
                </div>
            </div>
            <div className="summary">
                {this.props.summary}
            </div>
        </div>)
    }
}