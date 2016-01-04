import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { paySdkInit, paySdkPay } from '../libs/pay_sdk.js'

class OrdersPage extends Component {
    constructor(props) {
        super(props)
        this.payOrder = this.payOrder.bind(this)
    }

    componentWillMount() {
        console.log('component will mount')
    }

    componentDidMount() {
        console.log('component did mount')
        paySdkInit(()=> {
            console.log('pay sdk ready')
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log('component rece props')
        console.log(nextProps)
    }

    payOrder() {
        console.log('submit order')
        console.log(this.state)
        paySdkPay('wx123456790', 'order_no_111111')
    }

    render() {
        return (
            <div>
                <div className="order-container">
                    <div className="m20">
                        <span className="title">订单信息</span>
                    </div>
                    <div className="order-item">
                        <div>
                            <span className="sub-title">订单号:</span>
                            <span className="order-text">20150422489275</span>
                        </div>
                    </div>
                    <div className="order-item">
                        <span className="sub-title">票务信息</span>
                        <span className="sub-title bold">从《天空之城》到《起风了》电影音乐30年交响视听纪念版</span>
                        <span className="order-text">场次：2015-03-21 12:30</span>
                        <span className="order-text">票价：80元</span>
                        <span className="order-text">份数：2张</span>
                    </div>

                    <div className="order-item">
                        <span className="sub-title">取票信息</span>
                        <span className="sub-title bold">快递票</span>
                        <span className="order-text">收件人：Vivi    13800138000</span>
                        <span className="order-text">地址：上海 上海 徐汇区 虹梅路2007号1号楼604室</span>
                    </div>

                    <div className="order-item">
                        <span className="sub-title">附加信息</span>
                        <span className="order-text">姓名：金三胖</span>
                        <span className="order-text">身份证：310110190011100101</span>
                    </div>

                    <div className="order-item">
                        <span className="sub-title">费用信息</span>
                        <div className="order-fee-item clearfix">
                            <span className="order-text fl">票务费用:</span>
                            <span className="order-text fr">+ 160</span>
                        </div>
                        <div className="order-fee-item clearfix">
                            <span className="order-text fl">快递费用:</span>
                            <span className="order-text fr">+ 6</span>
                        </div>
                        <div className="order-fee-item clearfix">
                            <span className="order-text fl">优惠费用:</span>
                            <span className="order-text fr">- 20</span>
                        </div>
                    </div>

                    <div className="clearfix m20">
                        <span className="title fl">总费用</span>
                        <span className="title fr emphasize">146元</span>
                    </div>
                </div>

                <div className="order-contact">
                    <img className="logo" src="http://7tszlo.com1.z0.glb.clouddn.com/d2a0b6b8-ef1f-11e4-b903-00163e023969.png"/>
                    <div className="contact">
                        <span className="tip">客服电话: </span>
                        <span className="tel">4000-406-506</span>
                    </div>
                </div>

                <div className="toolbar">
                    <div className="info" id="total_price">共：0元</div>
                    <div className="confirm">
                        <a href="javascript:void(0);" onClick={ this.payOrder }>去支付</a>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(OrdersPage)
