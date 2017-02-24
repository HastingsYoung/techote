import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import List from '../List/List.jsx';
import './checklist.css';

export default class CheckList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        }
        this.count = 0;
    }

    addList() {
        let lists = this.state.lists;
        lists.push(<List key={this.count} title={"List Title"}></List>);
        this.count++;
        this.setState({lists: lists});
    }

    deleteList(i) {
        let lists = [];
        this.state.lists.forEach((l, idx)=> {
            if (idx != i) {
                lists.push(l);
            }
        });
        this.setState({lists: lists});
    }

    render() {
        return (<div className="checklist">
            <div className="checklist-btns">
                <div className="checklist-btn checklist-btn-add" onClick={this.addList.bind(this)}>Add</div>
                <div className="checklist-btn checklist-btn-delete" onClick={this.deleteList.bind(this,this.state.lists.length - 1)}>
                    Delete
                </div>
            </div>
            <div className="checklist-lists">
                {this.state.lists}
            </div>
        </div>);
    }
}