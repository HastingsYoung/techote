import React,{Component} from 'react';
import CheckList from '../CheckList/CheckList.jsx';
import './mainboard.css';

export default class MainBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="main-board">
            <div className="main-board-btns">
                <div className="main-board-btn" onClick={this.props.switchView}>
                    <i className="material-icons">assignment</i>
                </div>
                <div className="main-board-btn">
                    <i className="material-icons">assignment</i>
                </div>
                <div className="main-board-btn">
                    <i className="material-icons">assignment</i>
                </div>
                <div className="main-board-btn">
                    <i className="material-icons">assignment</i>
                </div>
                <div className="main-board-btn">
                    <i className="material-icons">assignment</i>
                </div>
                <div className="main-board-btn">
                    <i className="material-icons">assignment</i>
                </div>
                <div className="main-board-btn">
                    <i className="material-icons">assignment</i>
                </div>
            </div>
            <div className="note">
                <div className="cue-column">
                    CUE CUE CUE
                </div>
                <div className="note-content">
                    {/*<CheckList></CheckList>*/}
                    NOTE NOTE
                </div>
            </div>
            <div className="summary">
                SUMMARY SUMMARY SUMMARY
            </div>
        </div>);
    }
}