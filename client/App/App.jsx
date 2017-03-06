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
                    cueColumn: "",
                    noteContent: "",
                    summary: ""
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
            cueColumn: "",
            noteContent: "",
            summary: ""
        });
        this.setState(pages);
    }

    addUnorderList(i) {
        let pages = this.state.pages;
        let content = pages[i.page].noteContent;
        let d = document.createElement("div");
        let l1 = document.createElement("div");
        let l2 = document.createElement("div");
        let l3 = document.createElement("div");
        l1.innerHTML = `\n-&nbsp;`;
        l2.innerHTML = `\n-&nbsp;`;
        l3.innerHTML = `\n-&nbsp;`;
        d.appendChild(l1);
        d.appendChild(l2);
        d.appendChild(l3);
        content += d.innerHTML;
        pages[i.page].noteContent = content;
        this.setState({
            pages: pages
        });
    }

    addOrderList(i) {
        let pages = this.state.pages;
        let content = pages[i.page].noteContent;
        let d = document.createElement("div");
        let l1 = document.createElement("div");
        let l2 = document.createElement("div");
        let l3 = document.createElement("div");
        l1.innerHTML = `\n1.&nbsp;`;
        l2.innerHTML = `\n2.&nbsp;`;
        l3.innerHTML = `\n3.&nbsp;`;
        d.appendChild(l1);
        d.appendChild(l2);
        d.appendChild(l3);
        content += d.innerHTML;
        pages[i.page].noteContent = content;
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

    renderMindMaps() {
        let maps = [];
        this.state.pages.forEach((p, i)=> {
            let txt = "";
            if (typeof p.cueColumn == 'string') {
                txt = p.cueColumn.replace(/<\/?.+?>/g, "");
                if (txt)
                    maps.push(<MindMap key={i} data={txt}></MindMap>);
                return;
            }
            txt = p.cueColumn.innerHTML.toString().replace(/<\/?.+?>/g, "");
            if (txt)
                maps.push(<MindMap key={i} data={txt}></MindMap>);
        });
        return maps;
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
                {this.renderMindMaps()}
            </div>
        </div>);
    }
}