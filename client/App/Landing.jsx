import React,{Component} from 'react';
import {Captcha} from '../../common/captcha'
import './landing.css';

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname:"",
            pw:"",
            cpa:""
        }
    }

    _onLogin(){
        this.props.history.push("/tnote");
    }

    componentDidUpdate(){
        Captcha("Technote");
    }

    componentDidMount(){
        this.componentDidUpdate()
    }

    render() {
        return <div className="landing">
            <div className="login-container">
                <div className="logo">
                    <img src="/imgs/login-bg-2.jpg" alt=""/>
                </div>
                <InputBox placeholder="Username" value={this.state.uname} onChange={(evt)=>{
                    this.setState({uname:evt.target.value});
                }}/>
                <InputBox placeholder="Password" value={this.state.pw} password={true} onChange={(evt)=>{
                    this.setState({pw:evt.target.value});
                }}/>
                <InputBox placeholder="Captcha" value={this.state.cpa} password={false} onChange={(evt)=>{
                    this.setState({cpa:evt.target.value});
                }}/>
                <canvas id="cnvs"/>
                <div className="login-btns">
                    <div className="login-btn login" onClick={this._onLogin.bind(this)}>
                        Login
                    </div>
                    <div className="login-btn signup">
                        Sign Up
                    </div>
                </div>
            </div>
        </div>;
    }
}

class InputBox extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return <div className="input-box">
            <div className="input-icon">
                {this.props.icon}
            </div>
            <div className="input-content">
                <input type={this.props.password?"password":"text"} onChange={(evt)=>{
                    this.props.onChange(evt.target.value, this.props.identity);
                }} placeholder={this.props.placeholder?this.props.placeholder:""}
                       value={this.props.value || this.props.value == 0?this.props.value:""}/>
            </div>
        </div>;
    }
}