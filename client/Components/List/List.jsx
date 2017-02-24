/**
 * Created by hastings on 23/02/2017.
 */
import React, {Component} from 'react';
import './list.css';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            text: [],
        }
    }

    addItem(txt) {
        let checked = this.state.checked;
        checked.push(false);
        let text = this.state.text;
        text.push(txt);
        this.setState({checked: checked, text: text});
    }

    deleteItem(i) {
        let text = [];
        let checked = [];

        for (let k in this.state.checked) {
            if (k != i) {
                text.push(this.state.text[k]);
                checked.push(this.state.checked[k]);
            }
        }

        this.setState({checked: checked, text: text});
    }

    checkedItem(i) {
        let checked = this.state.checked;
        checked[i] = !checked[i];
        this.setState({checked: checked});
    }

    renderItems() {
        let items = [];
        for (let k in this.state.checked) {
            let item = (<div className={this.state.checked[k]?"list-item checked":"list-item"} key={k}>
                <input type="checkbox" checked={this.state.checked[k]}
                       onClick={this.checkedItem.bind(this,k)}/>
                <p>{this.state.text[k]}</p>
            </div>);
            items.push(item);
        }
        return items;
    }

    render() {
        return <div className="simple-list">
            <div className="list-title">{this.props.title}</div>
            <div className="simple-list-btns">
                <div className="simple-list-btn simple-list-btn-add" onClick={(evt)=>{
                    this.addItem("New Task");
                }}>Add Item
                </div>
                <div className="simple-list-btn simple-list-btn-delete" onClick={(evt)=>{
                    this.deleteItem(this.state.checked.length - 1);
                }}>Delete Item
                </div>
            </div>
            <div className="list-items">
                {this.renderItems()}
            </div>
        </div>
    }
}