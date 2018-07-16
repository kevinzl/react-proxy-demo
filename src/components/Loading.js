var React = require('react');
var assign = require('object-assign');

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible || false,
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.visible != this.state.visible) {
            this.setState({visible: newProps.visible});
        }
    }

    render() {
        var _style = this.state.visible == true ? styles.show : styles.hide;
        return (
            <div style={assign({}, styles.main, _style)}>
                <div style={styles.loading}>
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{background: 'none'}}>
                        <g transform="translate(25 50)">
                            <circle cx="0" cy="0" r="6" fill="#4F7BEE" transform="scale(0.29131 0.29131)">
                                <animateTransform attributeName="transform" type="scale" begin="-0.3333333333333333s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
                            </circle>
                        </g>
                        <g transform="translate(50 50)">
                            <circle cx="0" cy="0" r="6" fill="#4f7bee" transform="scale(0.000864073 0.000864073)">
                                <animateTransform attributeName="transform" type="scale" begin="-0.16666666666666666s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
                            </circle>
                        </g>
                        <g transform="translate(75 50)">
                            <circle cx="0" cy="0" r="6" fill="#4F7BEE" transform="scale(0.246879 0.246879)">
                                <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
                            </circle>
                        </g>
                    </svg>
                </div>
            </div>
        )
    }
}

var styles = {
    main: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: 'all .3s ease-in',
        WebkitTransition: 'all .3s ease-in',
        backgroundColor: 'rgba(255,255,255,.5)',
        zIndex: '99'
    },
    loading: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '30%',
        height: '20%',
        transform: 'translate(-50%, -50%)',
        WebkitTransform: 'translate(-50%, -50%)',
    },
    // 隐藏对话层
    hide: {
        opacity: '0',
        display: 'none',
    },
    // 显示对话层
    show: {
        opacity: '1',
        display: 'block',
    },
}


module.exports = Loading;