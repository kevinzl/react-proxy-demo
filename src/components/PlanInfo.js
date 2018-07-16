import React, { Component } from 'react';
import { NavBar, Icon, List, InputItem, Switch, TextareaItem, DatePicker} from 'antd-mobile';
import Request from '../common/request';
const Item = List.Item;
const Brief = Item.Brief;
class PlanInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            "planTitle":"",
            "planContent":"",
            "createTime":"",
            "deadlineTime":"",
            "planStatus":0,
            "expiredStatus":0
        }
    }
    componentDidMount(){
        Request({
            url:'/planInfo',
            param:{
                id:this.props.id,
            },
            success:(res) => {
                var resData = res.planInfo;
                this.setState({
                    "planTitle":resData.planTitle,
                    "planContent":resData.planContent,
                    "createTime":resData.createTime,
                    "deadlineTime":resData.deadlineTime,
                    "planStatus":resData.planStatus,
                    "expiredStatus":resData.expiredStatus,
                    "createDate":"",
                    "expiredDate":""
                });
                this.autoFocusInst.focus();
            }
        })
    }
    boBack() {
        window.location.hash = "plan_list"
    }
    render() {
        var planInfo = this.state
        return(
            <div id="planInfo">
                <div>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.boBack()}
                        rightContent={[
                            <Icon key="0" type="ellipsis" />,
                        ]}
                    >
                        计划详情
                    </NavBar>
                </div>
                <div className="planInfo">
                    <List renderHeader={() => '计划详情'} className="my-list">
                        <InputItem
                            {...{
                                value: planInfo.planTitle,
                                rules: [
                                    { required: true, message: 'Please input account' },
                                ]
                            }}
                            onChange={(value) =>this.setState({"planTitle":value})}
                            clear
                            placeholder="please input the plan name"
                        >计划名称</InputItem>
                        <TextareaItem
                            onChange={(value) =>this.setState({"planContent":value})}
                            ref={el => this.autoFocusInst = el}
                            title="计划内容"
                            value={planInfo.planContent}
                            placeholder="please input the information"
                            autoHeight
                            clear
                    />
                        <Item
                            extra={<Switch/>}
                        >完成状态</Item>
                        <DatePicker
                            mode="date"
                            title="请选择开始时间"
                            extra=""
                            value={planInfo.createDate}
                            onChange={date => this.setState({ createDate:date })}
                        >
                            <List.Item arrow="horizontal">开始时间</List.Item>
                        </DatePicker>
                        <DatePicker
                            mode="date"
                            title="请选择结束时间"
                            extra=""
                            value={planInfo.expiredDate}
                            onChange={date => this.setState({ expiredDate:date })}
                        >
                            <List.Item arrow="horizontal">开始时间</List.Item>
                        </DatePicker>
                    </List>
                </div>
            </div>
        )
    }
}
export default PlanInfo