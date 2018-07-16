import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon, ListView } from 'antd-mobile';
import Empty from './Empty';
import Request from '../common/request';
import PlanItem from './PlanItem';
const PAGESIZE = 6;
class PlanList extends Component{
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.state = {
            pageIndex:1,
            data: [],
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight*3/4,
            hasMore: true,
            hasNot: false
        }
    }
    componentDidMount() {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        this.requestPlanList(hei)
    }
    requestPlanList(height) {
        Request({
            url:'/planList',
            param:{
                pageIndex:this.state.pageIndex,
                pageSize: PAGESIZE
            },
            success:(res) => {
                if(res.pageCount === 0) {
                    this.setState({
                        hasNot: true
                    })
                }
                var _data = this.state.data.concat(res.datas);
                this.setState({
                    data: _data,
                    dataSource: this.state.dataSource.cloneWithRows(_data),
                    isLoading: false,
                    pageIndex: res.pageIndex + 1
                });
                if(height) {
                    this.setState({
                        height: height
                    })
                }
                if(res.pageIndex >= res.pageCount) {
                    this.setState({
                        hasMore: false
                    })
                }
            }
        })
    }
    goHome() {
        this.props.history.push("home");
    }
    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <PlanItem
                    key={rowID}
                    {...rowData}
                />
            );
        };
        return (<div>
            <div className="topBar">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.goHome()}
                    rightContent={[
                        <Icon key="0" type="ellipsis" />,
                    ]}
                >
                    计划列表
                </NavBar>
            </div>
            <div>
                {!this.state.hasNot ? <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div>
                        {this.state.hasMore ? this.state.isLoading ? '加载中...' : '加载完成' : '没有更多了'}
                    </div>)}
                    renderRow={row}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                        backgroundColor: '#f5f5f9'
                    }}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                /> : <Empty />}
            </div>
        </div>)
    }
    onEndReached = (event) => {
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        console.log('isLoading: '+this.state.isLoading);
        console.log('hasMore: '+this.state.hasMore);
        this.setState({ isLoading: true });

        this.requestPlanList()
    }
}
export default PlanList