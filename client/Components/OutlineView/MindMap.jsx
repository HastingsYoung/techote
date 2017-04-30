import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {MDParser, Node} from '../../../common/markdownparser';
import jsPDF from '../../../common/jsPDF';

var svg2pdf = require("svg2pdf");
var d3 = require("d3");

export default class MindMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dom: ""
        }
    }

    downloadFile(fileName) {
        let dom = this._dom;
        if (dom) {
            // add attributes to make sure browser can open it straightforward
            let svg = dom.getElementsByTagName("svg")[0];
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            svg.setAttribute("xml:space", "preserve");

            // A4 size
            //var pdf = new jsPDF('l', 'pt', [1487,2105]);
            //svg2pdf(svg, pdf, {
            //    xOffset: 0,
            //    yOffset: 0,
            //    scale: 1
            //});
            //
            //var uri = pdf.output('datauristring');

            let file = document.createElement("a");
            let blob = new Blob([dom.innerHTML], {type: "image/svg+xml"});
            file.href =  URL.createObjectURL(blob);
            //file.href = uri;
            file.download = fileName;
            document.body.appendChild(file);
            file.click();
            document.body.removeChild(file);
        }
    }

    componentDidMount() {
        // initialise content when components were first mounted
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        let dom = ReactDOM.findDOMNode(this).querySelector(".canvas");
        const width = window.screen.width / 2;
        const height = window.screen.height;
        if (dom)
            dom.innerHTML = "";
        this._dom = dom;
        let svg = d3.select(dom).append("svg").attr("width", width * 0.95).attr("height", height * 0.95);
        let g = svg.append("g").attr("transform", function () {
            return "translate(100,50)";
        });

        let table = MDParser().parse(this.props.data);
        if (!(typeof table == 'object' && table.length))
            table = [{
                name: "node1",
                parent: ""
            }, {
                name: "node2",
                parent: "node1"
            }, {
                name: "node3",
                parent: "node1"
            }];
        table = table.map((n, i)=>n.parent ? {
            name: n.name,
            parent: n.parent,
            content: n.content
        } : {name: n.name, parent: "Page", content: n.content});
        table.push({name: "Page", parent: "", content: this.props.title});
        let root = d3.stratify().id(function (d) {
            return d.name;
        }).parentId(function (d) {
            return d.parent;
        })(table).sort(function (a, b) {
            return a.height - b.height
        });
        let cluster = d3.cluster().size([height * 0.7, 400]);
        cluster(root);
        let node = g.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", function (d) {
                return "node" + (d.children ? " node--internal" : " node--leaf");
            })
            .attr("transform", function (d, i) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        node.append("circle").attr("r", 5).style("fill", "#2196f3");
        node.append("text")
            .attr("dy", 3)
            .attr("x", function (d) {
                return d.children ? -15 : 15;
            })
            .style("text-anchor", function (d) {
                return d.children ? "end" : "start";
            }).style("fill", "black").style("font-family", "'Indie Flower', cursive").style("font-size", "larger")
            .text(function (d) {
                return d.data.content;
            });
        let hiddenLinks = g.selectAll(".hd-link").data(root.descendants().slice(1)).enter().append("path").attr("class", "hd-link").attr("d", function (d, i) {
            return "M" + d.y + "," + d.x
                + "C" + (d.parent.y) + "," + d.x
                + " " + (d.parent.y) + "," + d.parent.x
                + " " + (d.parent.y) + "," + d.parent.x;
        }).style("fill", "none").style("stroke-opacity", "transparent");
        let links = g.selectAll(".link").data(root.descendants().slice(1)).enter().append("path").attr("class", "link").attr("d", function (d, i) {
            return "M" + d.y + "," + d.x
                + "C" + (d.parent.y) + "," + d.x
                + " " + (d.parent.y) + "," + d.parent.x
                + " " + (d.parent.y) + "," + d.parent.x;
        }).style("fill", "none").style("stroke-opacity", "0.4").style("stroke", "#000").style("stroke", "3px").style("stroke-linecap", "round");
    }

    render() {
        return <div className="drawboard">
            <div className="canvas" style={{display:"flex",flexFlow:"column",flex:"1",height:"100vh"}}></div>
            <div className="canvas-download" onClick={()=>{
                this.downloadFile(this.props.title);
            }
            }>
                <i className="material-icons">file_download</i>
            </div>
        </div>;
    }
}