import React, {Component} from 'react';
import ReactDOM from 'react-dom';
var d3 = require("d3");

export default class MindMap extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let dom = ReactDOM.findDOMNode(this);
        let svg = d3.select("svg").attr("width",800).attr("height",600);
        let g = svg.append("g").attr("transform",function(){
            return "translate(100,50)";
        });

        let table = [{
            "name": "node1",
            "parent": ""
        }, {
            "name": "node2",
            "parent": "node1"
        }, {
            "name": "node3",
            "parent": "node1"
        }, {
            "name": "node4",

            "parent": "node2"
        }, {
            "name": "node5",
            "parent": "node2"
        }, {
            "name": "node6",
            "parent": "node3"
        },{
            "name": "node7",
            "parent": "node3"
        },{
            "name": "node8",
            "parent": "node6"
        },{
            "name": "node9",
            "parent": "node6"
        },{
            "name": "node10",
            "parent": "node6"
        },{
            "name": "node11",
            "parent": "node5"
        }];

        let root = d3.stratify().id(function (d) {
            return d.name;
        }).parentId(function (d) {
            return d.parent;
        })(table).sort(function (a, b) {
            return a.height - b.height
        });
        let cluster = d3.cluster().size([300, 400]);
        cluster(root);
        let links = g.selectAll(".link").data(root.descendants().slice(1)).enter().append("path").attr("class", "link").attr("d", function (d, i) {
            return "M" + d.y + "," + d.x
                + "C" + (d.parent.y) + "," + d.x
                + " " + (d.parent.y) + "," + d.parent.x
                + " " + (d.parent.y) + "," + d.parent.x;
        });

        let node = g.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", function (d) {
                return "node" + (d.children ? " node--internal" : " node--leaf");
            })
            .attr("transform", function (d, i) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        node.append("circle").attr("r", 5);
        node.append("text")
            .attr("dy", 3)
            .attr("x", function (d) {
                return d.children ? -8 : 8;
            })
            .style("text-anchor", function (d) {
                return d.children ? "end" : "start";
            })
            .text(function (d) {
                return d.id;
            });
        ;
    }

    render() {
        return <div className="canvas" style={{display:"flex",flexFlow:"column",flex:"1",height:"100vh"}}>
            <svg></svg>
        </div>
    }
}