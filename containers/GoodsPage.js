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
            <a className="play" href="javascript:void(0);" key={play.id}
               onClick={ (event) => this.selectPlay(play, event) }>{play.desc}</a>
        )
    }

    renderPrice(price) {
        return (
            <a className="play" href="javascript:void(0);" key={price.id}
               onClick={ (event) => this.selectPrice(price, event) }>{price.price}元</a>
        )
    }

    render() {
        return (
            <div>
                <div>场次</div>
                <hr />
                { this.props.goods.plays.map(this.renderPlay) }
                <div>价格</div>
                { this.props.goods.prices.map(this.renderPrice) }
                <div>购买数量</div>
                <input value={ this.state.quantity } readOnly />
                <button onClick={ this.increaseQuantity }>+</button>
                {' '}
                <button onClick={ this.decreaseQuantity }>-</button>
                <div>
                    <span>{ JSON.stringify(this.state) }</span>
                </div>
                <div>
                    <button onClick={ this.submitOrder }>提交订单</button>
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
