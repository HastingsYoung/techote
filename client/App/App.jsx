import React,{Component} from 'react';
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
            currentFocus: 0,
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

    addList(i) {
        let pages = this.state.pages;
        let content = pages[i].noteContent;
        let d = document.createElement("div");
        let l1 = document.createElement("div");
        let l2 = document.createElement("div");
        let l3 = document.createElement("div");
        l1.innerHTML = `\n- List`;
        l2.innerHTML = `\n- List`;
        l3.innerHTML = `\n- List`;
        d.appendChild(l1);
        d.appendChild(l2);
        d.appendChild(l3);
        content += d.innerHTML;
        pages[i].noteContent = content;
        this.setState({
            pages: pages
        });
    }

    onFocus(i) {
        this.setState({currentFocus: i});
    }

    onPageChange(i, page) {
        let p = this.state.pages;
        p[i] = page;
        this.setState(p);
    }

    render() {
        return (<div className="app" style={{display:"flex",flexFlow:"row",width:"100%"}}>
            <div className="left-view"
                 style={{position:"relative",width:"50vw",height:"100vh",overflowX:"hidden",overflowY:"scroll"}}>
                {this.state.isMarkdownView ? <MarkdownView pages={this.state.pages}
                                                           switchView={this.switchView.bind(this)}></MarkdownView> :
                    <MainBoard switchView={this.switchView.bind(this)}
                               addPage={this.addPage.bind(this)}
                               addList={this.addList.bind(this,this.state.currentFocus)}
                               onFocus={this.onFocus.bind(this)} pages={this.state.pages}
                               onPageChange={this.onPageChange.bind(this)}></MainBoard>}
            </div>
            <div className="right-view"
                 style={{position:"relative",width:"50vw",height:"100vh",overflowX:"hidden",overflowY:"scroll"}}>
                <MindMap></MindMap>
            </div>
        </div>);
    }
}