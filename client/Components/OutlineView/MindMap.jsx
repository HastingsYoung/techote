import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {MDParser, Node} from '../../../common/markdownparser';

var d3 = require("d3");

export default class MindMap extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        let dom = ReactDOM.findDOMNode(this);
        const width = window.screen.width / 2;
        const height = window.screen.height / 2;
        dom.innerHTML = "";
        let canvas = d3.select(".canvas").append("svg");
        let svg = d3.select("svg").attr("width", width * 0.95).attr("height", height * 0.95);
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
        table.push({name: "Page", parent: "", content: "Note Page"});
        let root = d3.stratify().id(function (d) {
            return d.name;
        }).parentId(function (d) {
            return d.parent;
        })(table).sort(function (a, b) {
            return a.height - b.height
        });
        let cluster = d3.cluster().size([300, 400]);
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

        node.append("circle").attr("r", 13);
        node.append("text")
            .attr("dy", 3)
            .attr("x", function (d) {
                return d.children ? -15 : 15;
            })
            .style("text-anchor", function (d) {
                return d.children ? "end" : "start";
            })
            .text(function (d) {
                return d.data.content;
            });
        let hiddenLinks = g.selectAll(".hd-link").data(root.descendants().slice(1)).enter().append("path").attr("class", "hd-link").attr("d", function (d, i) {
            return "M" + d.y + "," + d.x
                + "C" + (d.parent.y) + "," + d.x
                + " " + (d.parent.y) + "," + d.parent.x
                + " " + (d.parent.y) + "," + d.parent.x;
        });
        let links = g.selectAll(".link").data(root.descendants().slice(1)).enter().append("path").attr("class", "link").attr("d", function (d, i) {
            return "M" + d.y + "," + d.x
                + "C" + (d.parent.y) + "," + d.x
                + " " + (d.parent.y) + "," + d.parent.x
                + " " + (d.parent.y) + "," + d.parent.x;
        });
    }

    render() {
        return <div className="canvas" style={{display:"flex",flexFlow:"column",flex:"1",height:"100vh"}}>
        </div>
    }
}