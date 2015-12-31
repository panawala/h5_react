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

    componentDidMount(){
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
                <div>场次</div>
                <hr />
                <div>价格</div>
                <div>购买数量</div>
                <div>
                    <button onClick={ this.payOrder }>提交订单</button>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(OrdersPage)
