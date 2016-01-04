import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadPlay, loadPrice } from '../actions'

class GoodsPage extends Component {
    constructor(props) {
        super(props)
        // 初始化状态
        this.state = {
            selectedPlay: props.goods.selectedPlay,
            selectedPrice: props.goods.selectedPrice,
            quantity: 1,
            initFeedId: props.goods.initFeedId
        }

        // 渲染子方法
        this.renderPlay = this.renderPlay.bind(this)
        this.renderPrice = this.renderPrice.bind(this)

        // 绑定事件
        this.selectPlay = this.selectPlay.bind(this)
        this.selectPrice = this.selectPrice.bind(this)
        this.increaseQuantity = this.increaseQuantity.bind(this)
        this.decreaseQuantity = this.decreaseQuantity.bind(this)
        this.submitOrder = this.submitOrder.bind(this)
    }

    componentWillMount() {
        this.props.loadPlay(this.state.initFeedId)
        console.log('component will mount')
    }

    componentDidMount(){
        console.log('component did mount')
    }

    componentWillReceiveProps(nextProps) {
        console.log('component rece props')
        console.log(nextProps)
        if(nextProps.goods.selectedPlay) {
            this.setState({selectedPlay: nextProps.goods.selectedPlay})
        }
        if(nextProps.goods.selectedPrice) {
            this.setState({selectedPrice: nextProps.goods.selectedPrice})
        }
    }

    increaseQuantity() {
        this.setState({quantity: this.state.quantity + 1})
    }

    decreaseQuantity() {
        if(this.state.quantity > 0){
            this.setState({quantity: this.state.quantity - 1})
        }
    }

    submitOrder() {
        console.log('submit order')
        console.log(this.state)
        location.href = '/orders/order1212121'
    }

    selectPlay(play, evt) {
        this.setState({selectedPlay: play})
        this.props.loadPrice(play.id)
        this.setState({quantity: 1})
    }

    selectPrice(price, evt) {
        this.setState({selectedPrice: price})
        this.setState({quantity: 1})
    }

    renderPlay(play) {
        return (
            <a href="javascript:void(0);" key={play.id}
               onClick={ (event) => this.selectPlay(play, event) }>{play.desc}</a>
        )
    }

    renderPrice(price) {
        return (
            <a href="javascript:void(0);" key={price.id}
               onClick={ (event) => this.selectPrice(price, event) }>{price.price}元</a>
        )
    }

    render() {
        return (
            <div>
                <div>场次</div>
                <hr />

                <div className="container">
                    <img className="icon" src="http://7tszlo.com1.z0.glb.clouddn.com/2d6fad02-b2bf-11e5-8f90-00163e023969.png" />
                    <span className="icon-text">选择场次</span>
                    <span className="icon-sub-text">3-21 12:00</span>
                    <div className="list">
                        { this.props.goods.plays.map(this.renderPlay) }
                    </div>
                </div>
                <div className="container">
                    <img className="icon" src="http://7tszlo.com1.z0.glb.clouddn.com/ed595688-b2c7-11e5-8f90-00163e023969.png" />
                    <span className="icon-text">选择票价</span>
                    <span className="icon-sub-text">￥80</span>
                    <div className="list">
                        { this.props.goods.prices.map(this.renderPrice) }
                    </div>
                </div>

                <div className="container">
                    <img className="icon" src="http://7tszlo.com1.z0.glb.clouddn.com/a5e04f72-b2c8-11e5-8f90-00163e023969.png" />
                    <span className="icon-text">购买数量</span>
                    <span className="icon-sub-text">2张</span>
                    <div className="list">
                        <input className="counter" value="-"  onClick={ this.decreaseQuantity } readOnly/>
                        <input value={ this.state.quantity } />
                        <input className="counter" value="+" onClick={ this.increaseQuantity } readOnly/>
                        <span className="quantity-tip">每笔限购6张|库存20张</span>
                    </div>
                </div>

                <div className="container">
                    <img className="icon" src="http://7tszlo.com1.z0.glb.clouddn.com/36c34024-b2d0-11e5-8f90-00163e023969.png" />
                    <span className="icon-text">取票方式</span>
                    <span className="icon-sub-text">电子票</span>
                    <div className="list">
                        <div className="red-box">
                            <div className="left-circle"></div>
                            <span className="order-type-text">电子票</span>
                            <span className="upper">接收手机号18801790923</span>
                            <span className="downer">在订单成交后会收到取票密码，接收免费</span>
                        </div>
                    </div>
                </div>

                <div className="toolbar">
                    <div className="info" id="total_price">共：0元</div>
                    <div className="confirm">
                        <a href="javascript:void(0);" onClick={ this.submitOrder }>提交订单</a>
                    </div>
                </div>

                <div>
                    <span>{ JSON.stringify(this.state) }</span>
                </div>
                <div>
                    { this.props.isFetching? <img src="http://dribbble.s3.amazonaws.com/users/45269/screenshots/1300220/loading_1.gif" />: <hr/> }
                </div>
            </div>
        )
    }
}

GoodsPage.propTypes = {
    goods: PropTypes.object,
    loadPlay: PropTypes.func.isRequired,
    loadPrice: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { feedid } = state.router.params
    state.goods.initFeedId = feedid
    return {
        goods: state.goods
    }
}

export default connect(mapStateToProps, {
    loadPlay, loadPrice
})(GoodsPage)
