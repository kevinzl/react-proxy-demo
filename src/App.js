import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Loadable from 'react-loadable';
import Loading from './components/Loading';
const loading = () => <Loading visible={true} />;

// 用户中心
const Personal = Loadable({
    loader: () => import('./components/Personal'),
    loading: loading,
});
// 任务列表
const PlanList = Loadable({
    loader: () => import('./components/PlanList'),
    loading: loading,
});
// 任务详情
const PlanInfo = Loadable({
    loader: () => import('./components/PlanInfo'),
    loading:loading
});
// 主页
const Home = Loadable({
    loader: () => import('./components/Home'),
    loading:loading
});
class App extends Component {
  render() {
    return (
        <div className="App">
            <Route path="/" component={Home} exact ></Route>
            <Route path="/personal" component={Personal}></Route>
            <Route path="/plan_list" component={PlanList}></Route>
            <Route path="/plan_info/:id" component={PlanInfo}></Route>
            <Route path="/home" component={Home}></Route>
        </div>
    );
  }
}

export default App;
