import React, { Component } from 'react';
import { Button, ActivityIndicator } from 'antd-mobile'
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            animating: false
        }
    }
    // 登入
    login() {
        this.setState({
            animating: !this.state.animating
        });
        this.closeTimer = setTimeout(() => {
            this.setState({
                animating: !this.state.animating
            });
            this.props.history.push('plan_list');
        },1000)
    }
    // 用户中心
    goToPersonal() {
        this.props.history.push('personal');
    }
    render(){
        return(
            <div id="home" style={{height: document.documentElement.clientHeight}}>
                <div className="userLogo" onClick={() => this.goToPersonal()}>
                </div>
                <div className="loginButton">
                    <Button type="primary"  size="small" style={style.button} onClick={() =>this.login()}>登入</Button>
                    <div>
                        <ActivityIndicator
                            toast
                            text="Loading..."
                            animating={this.state.animating}
                        >
                        </ActivityIndicator>
                    </div>
                </div>
            </div>
        )
    }
    componentWillUnmount() {
        clearTimeout(this.closeTimer);
    }
}
let style = {
    button:{
        width:"7rem",
        margin: "0 auto"
    }
};
export default Home

