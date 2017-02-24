import React,{Component} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import './react-draft-wysiwyg.css';
import MarkdownView from '../Components/MarkdownView/MarkdownView.jsx';
import MainBoard from '../Components/Note/MainBoard.jsx';
import MindMap from '../Components/OutlineView/MindMap.jsx';

export default class App extends Component {
    constructor(props) {
        super(props);
        //this.state = {editorState: EditorState.createEmpty()};
        //this.onEditorStateChange = (editorState) => {
        //    this.setState({
        //        editorState,
        //    });
        //}
        this.state = {
            isMarkdownView: false
        }
    }

    switchView() {
        this.setState({isMarkdownView: !this.state.isMarkdownView});
    }

    render() {
        const text = `# D3 API Reference

D3 4.0 is a [collection of modules](https://github.com/d3) that are designed to work together; you can use the modules independently, or you can use them together as part of the default build. The source and documentation for each module is available in its repository. Follow the links below to learn more. For changes between 3.x and 4.0, see [CHANGES](https://github.com/d3/d3/blob/master/CHANGES.md); see also the [3.x reference](https://github.com/d3/d3-3.x-api-reference/blob/master/API-Reference.md).

* [Arrays](#arrays-d3-array) ([Statistics](#statistics), [Search](#search), [Transformations](#transformations), [Histograms](#histograms))
* [Axes](#axes-d3-axis)
* [Brushes](#brushes-d3-brush)
* [Chords](#chords-d3-chord)
* [Collections](#collections-d3-collection) ([Objects](#objects), [Maps](#maps), [Sets](#sets), [Nests](#nests))
* [Colors](#colors-d3-color)
* [Dispatches](#dispatches-d3-dispatch)
* [Dragging](#dragging-d3-drag)
* [Delimiter-Separated Values](#delimiter-separated-values-d3-dsv)
* [Easings](#easings-d3-ease)
* [Forces](#forces-d3-force)
* [Number Formats](#number-formats-d3-format)
* [Geographies](#geographies-d3-geo) ([Paths](#paths), [Projections](#projections), [Spherical Math](#spherical-math), [Spherical Shapes](#spherical-shapes), [Streams](#streams), [Transforms](#transforms))
* [Hierarchies](#hierarchies-d3-hierarchy)
* [Interpolators](#interpolators-d3-interpolate)
* [Paths](#paths-d3-path)
* [Polygons](#polygons-d3-polygon)
* [Quadtrees](#quadtrees-d3-quadtree)
* [Queues](#queues-d3-queue)
* [Random Numbers](#random-numbers-d3-random)
* [Requests](#requests-d3-request)
* [Scales](#scales-d3-scale) ([Continuous](#continuous-scales), [Sequential](#sequential-scales), [Quantize](#quantize-scales), [Ordinal](#ordinal-scales))
* [Selections](#selections-d3-selection) ([Selecting](#selecting-elements), [Modifying](#modifying-elements), [Data](#joining-data), [Events](#handling-events), [Control](#control-flow), [Local Variables](#local-variables), [Namespaces](#namespaces))
* [Shapes](#shapes-d3-shape) ([Arcs](#arcs), [Pies](#pies), [Lines](#lines), [Areas](#areas), [Curves](#curves), [Symbols](#symbols), [Stacks](#stacks))
* [Time Formats](#time-formats-d3-time-format)
* [Time Intervals](#time-intervals-d3-time)
* [Timers](#timers-d3-timer)
* [Transitions](#transitions-d3-transition)
* [Voronoi Diagrams](#voronoi-diagrams-d3-voronoi)
* [Zooming](#zooming-d3-zoom)`;

        return (<div className="app" style={{display:"flex",flexFlow:"row",width:"100%"}}>
            <div className="left-view" style={{position:"relative",width:"50vw",height:"100vh",overflowX:"hidden",overflowY:"scroll"}}>
                {this.state.isMarkdownView ? <MarkdownView text={text}
                                                           switchView={this.switchView.bind(this)}></MarkdownView> :
                    <MainBoard switchView={this.switchView.bind(this)}></MainBoard>}
            </div>
            <div className="right-view" style={{position:"relative",width:"50vw",height:"100vh",overflowX:"hidden",overflowY:"scroll"}}>
                <MindMap></MindMap>
            </div>
        </div>);
    }
}