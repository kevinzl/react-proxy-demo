import React, { Component } from 'react';
import { NavBar, Icon, Card, WhiteSpace} from 'antd-mobile';
import planLogo from '../images/listLogo.jpg'

class PlanItem extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        var propsInfo = this.props;
        var id = propsInfo.id;
        return(
            <div onClick={() =>this.getPlanInfo(id)}>
                <Card full>
                    <Card.Header
                        title={propsInfo.planTitle}
                        thumb={planLogo}
                        extra={<span>{propsInfo.planStatus === 0?"进行中":"已失效"}</span>}
                    />
                    <Card.Body>
                        <div style={style.ellisps}>{propsInfo.planContent}</div>
                    </Card.Body>
                    <Card.Footer content={propsInfo.createTime} extra={<div>{propsInfo.deadlineTime}</div>}  />
                </Card>
                <WhiteSpace></WhiteSpace>
            </div>
        )
    }
    getPlanInfo(id) {
        window.location.hash = `plan_info/${id}`
    }
}
var style = {
    ellisps:{
        overflow: "hidden",
        "textOverflow":"ellipsis",
        "whiteSpace": "nowrap",
        "maxWidth":"25rem"
    }
}
export default PlanItem