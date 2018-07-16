import React from 'react';

import EMPTY from '../images/empty.png'

class Empty extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{ textAlign: "center", padding: "25% 20%"}}>
                <img style={{ marginBottom: "1.5rem" }} className="nolist-img" src={EMPTY} />
                <p style={{ color: "#9BACBB", fontSize: "1.6rem" }}>{this.props.msg || '暂无数据'}</p>
            </div>
        )
    }
}

export default Empty;