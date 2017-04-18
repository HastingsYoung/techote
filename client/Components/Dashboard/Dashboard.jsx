import React,{Component} from 'react';
import './dashboard.css';

export default class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return <div className={this.props.visible?"dashboard visible":"dashboard"}>
            <div className="dashboard-left">
                <div className="profile">
                    <img src="/imgs/profile.jpg" alt=""/>
                </div>
            </div>
            <div className="dashboard-right">
                <div className="user">
                    Hastings Young
                </div>
                <div className="figures">
                    <div className="figure-block">
                        <h3>Notes</h3>
                        <span>14</span>
                    </div>
                    <div className="figure-block">
                        <h3>Pages</h3>
                        <span>203</span>
                    </div>
                    <div className="figure-block">
                        <h2>Days</h2>
                        <span>59</span>
                    </div>
                </div>
                {/*<div className="splitter">
                 ...
                 </div>*/}
            </div>
        </div>
    }
}