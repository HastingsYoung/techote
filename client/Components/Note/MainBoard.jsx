import React,{Component} from 'react';
import CheckList from '../CheckList/CheckList.jsx';
import Page from './Page.jsx';
import './mainboard.css';

export default class MainBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [
                {
                    cueColumn: ["Cue"],
                    noteContent: [],
                    summary: ["Summary"]
                }
            ]
        }
    }

    renderPages() {
        let pages = [];
        this.state.pages.forEach((page, index)=> {
            pages.push(<Page key={index} cueColumn={page.cueColumn} noteContent={page.noteContent}
                             summary={page.summary}></Page>)
        });
        return pages;
    }

    addList(i) {
        let pages = this.state.pages;
        let content = pages[i].noteContent;
        content.push(<CheckList key={pages[i].noteContent.length}></CheckList>);
        pages[i].noteContent = content;
        this.setState({
            pages: pages
        });
    }

    render() {
        return (<div className="main-board">
            <div className="main-board-btns">
                <div className="main-board-btn" onClick={this.props.switchView}>
                    <i className="material-icons">assignment</i>
                </div>
                <div className="main-board-btn" onClick={this.addList.bind(this,0)}>
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
            {this.renderPages()}
        </div>);
    }
}