import React,{Component} from 'react';

import './landing.css';

export default class Landing extends Component {
    constructor(props) {
        super(props);
    }

    _onLogin(){
        this.props.history.push("/tnote");
    }

    render() {
        return <div className="landing">
            <div className="login-container">
                <div className="logo">
                    <img src="/imgs/login-bg-2.jpg" alt=""/>
                </div>
                <InputBox placeholder="Username" onChange={()=>{}}></InputBox>
                <InputBox placeholder="Password" password={true} onChange={()=>{}}></InputBox>
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