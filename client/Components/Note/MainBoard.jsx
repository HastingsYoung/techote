import React,{Component} from 'react';
import CheckList from '../CheckList/CheckList.jsx';
import Page from './Page.jsx';
import './mainboard.css';

export default class MainBoard extends Component {
    constructor(props) {
        super(props);
    }

    renderPages() {
        let pages = [];
        this.props.pages.forEach((page, index)=> {
            pages.push(<Page key={index} cueColumn={page.cueColumn} noteContent={page.noteContent}
                             summary={page.summary} onFocus={(evt)=>{
                                this.props.onFocus(index);
                             }} onPageChange={this.props.onPageChange} index={index}></Page>);
        });
        return pages;
    }

    render() {
        return (<div className="main-board">
            <div className="main-board-btns">
                <div className="main-board-btn" onClick={this.props.switchView}>
                    <i className="material-icons">chrome_reader_mode</i>
                </div>
                <div className="main-board-btn" onClick={this.props.addPage}>
                    <i className="material-icons">assignment</i>
                </div>
                <div className="main-board-btn" onClick={this.props.addList}>
                    <i className="material-icons">list</i>
                </div>
            </div>
            {this.renderPages()}
        </div>);
    }
}