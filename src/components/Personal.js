import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import Request from '../common/request'
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
class Personal extends Component{
    constructor(props){
        super(props);
        this.state = {
            userInfo:{}
        }
    }
    componentDidMount() {
        Request({
            param:{},
            url:'/userInfo',
            success:(res) => {
                this.setState({
                    userInfo:res.userInfo
                })
            }
        })
    }
    goHome() {
        this.props.history.push("home");
    }
    render() {
        let userInfo = this.state.userInfo;
        return(
            <div id="personal">
                <div className="topBar">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.goHome()}
                        rightContent={[
                            <Icon key="0" type="ellipsis" />,
                        ]}
                    >
                        个人中心
                    </NavBar>
                </div>
                <div className="userLogo"></div>
                <div className="info">
                    <List renderHeader={() => '基本信息'} className="my-list">
                        <Item extra={userInfo.name}>昵称</Item>
                        <Item extra={userInfo.age}>年龄</Item>
                        <Item extra={userInfo.hometown}>住址</Item>
                        <Item extra={userInfo.fav}>爱好</Item>
                        <Item extra={userInfo.job}>工作</Item>

                    </List>
                </div>
            </div>
        )
    }
}
export default Personal