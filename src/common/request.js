import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Superagent from 'superagent';
import { Toast } from 'antd-mobile'
import assign from 'object-assign';
import  Loading from '../components/Loading';
var apiHost = '';
var apiPath = '/collection-api/rest' // 接口统一地址
var loading = (<Loading visible={true} />);
var loadingNode = null;
const renderLoading = () => {
    if(!loadingNode){
        loadingNode = document.createElement('div');
        document.body.appendChild(loadingNode);
    }
    ReactDOM.render(loading, loadingNode);
}
// 环境变量
switch(process.env.NODE_ENV) {
    case 'development':
        apiHost = '';
        break;
    case 'test':
        apiHost = '***';
        break;
    case 'production':
        apiHost = '***';
        break;
    default:
        break;
}
function request(obj) {
    // 载入Loading
    if(obj.isLoading) {
        renderLoading()
    }

    var param = assign({}, obj.param || {})

    Superagent[obj.method || 'post'](apiHost + apiPath + obj.url)
        .send(param)
        .set('Accept', 'application/json')
        .end((err, res) => {
            // 卸载Loading
            if(obj.isLoading) {
                setTimeout(() => {
                    ReactDOM.unmountComponentAtNode(loadingNode);
                }, 300)
            }

            if(err) {
                obj.error ? obj.error(err) : Toast.info("网络繁忙，请稍后重试", 1);
                return;
            }

            var _res = JSON.parse(res.text)

            switch(parseInt(_res.code, 10)) {
                case 0:
                    obj.success(_res.data)
                    break;
                default:
                    obj.default ? obj.default(_res) : Toast.info(_res.msg, 1)
                    break;
            }
        });
}

var Request = function(obj) {
    var _obj = assign({isLoading: true}, obj)
    request(_obj)

}

export default Request