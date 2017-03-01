import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import MarkdownView from '../Components/MarkdownView/MarkdownView.jsx';
import MainBoard from '../Components/Note/MainBoard.jsx';
import MindMap from '../Components/OutlineView/MindMap.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [
                {
                    cueColumn: "Cue",
                    noteContent: "Note",
                    summary: "Summary"
                }
            ],
            currentFocus: {
                page: 0,
                region: 0,
                row: 0,
                char: 0
            },
            isMarkdownView: false
        }
    }

    switchView() {
        this.setState({isMarkdownView: !this.state.isMarkdownView});
    }

    addPage() {
        let pages = this.state.pages;
        pages.push({
            cueColumn: "Cue",
            noteContent: "Note",
            summary: "Summary"
        });
        this.setState(pages);
    }

    addUnorderList(i) {
        let pages = this.state.pages;
        let content = pages[i].noteContent;
        let d = document.createElement("div");
        let l1 = document.createElement("div");
        let l2 = document.createElement("div");
        let l3 = document.createElement("div");
        l1.innerHTML = `\n- `;
        l2.innerHTML = `\n- `;
        l3.innerHTML = `\n- `;
        d.appendChild(l1);
        d.appendChild(l2);
        d.appendChild(l3);
        content += d.innerHTML;
        pages[i].noteContent = content;
        this.setState({
            pages: pages
        });
    }

    addOrderList(i) {
        let pages = this.state.pages;
        let content = pages[i].noteContent;
        let d = document.createElement("div");
        let l1 = document.createElement("div");
        let l2 = document.createElement("div");
        let l3 = document.createElement("div");
        l1.innerHTML = `\n1. `;
        l2.innerHTML = `\n2. `;
        l3.innerHTML = `\n3. `;
        d.appendChild(l1);
        d.appendChild(l2);
        d.appendChild(l3);
        content += d.innerHTML;
        pages[i].noteContent = content;
        this.setState({
            pages: pages
        });
    }

    onFocus(pageIndex, regionIndex, rowIndex, charIndex) {
        this.setState({
            currentFocus: {
                page: pageIndex,
                region: regionIndex,
                row: rowIndex,
                char: charIndex
            }
        });
    }

    onBlur(pageIndex, regionIndex, rowIndex, charIndex) {
        this.setState({
            currentFocus: {
                page: pageIndex,
                region: regionIndex,
                row: rowIndex,
                char: charIndex
            }
        });
    }

    onPageChange(i, page, region, row, char, func) {
        let p = this.state.pages;
        p[i] = page;
        let cf = {
            page: i,
            region: region,
            row: row,
            char: char
        };
        this.setState({
            pages: p,
            currentFocus: cf
        }, func);
    }

    render() {
        return (<div className="app" style={{display:"flex",flexFlow:"row",width:"100%"}}>
            <div className="left-view"
                 style={{position:"relative",width:"50vw",height:"100vh",overflowX:"hidden",overflowY:"scroll"}}>
                {this.state.isMarkdownView ? <MarkdownView pages={this.state.pages}
                                                           switchView={this.switchView.bind(this)}></MarkdownView> :
                    <MainBoard switchView={this.switchView.bind(this)}
                               addPage={this.addPage.bind(this)}
                               addUnorderList={this.addUnorderList.bind(this,this.state.currentFocus)}
                               addOrderList={this.addOrderList.bind(this,this.state.currentFocus)}
                               onFocus={this.onFocus.bind(this)} pages={this.state.pages}
                               onPageChange={this.onPageChange.bind(this)}
                               onBlur={this.onBlur.bind(this)}
                               ances={this}></MainBoard>}
            </div>
            <div className="right-view"
                 style={{position:"relative",width:"50vw",height:"100vh",overflowX:"hidden",overflowY:"scroll"}}>
                <MindMap></MindMap>
            </div>
        </div>);
    }
}