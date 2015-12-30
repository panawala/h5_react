import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadPlay, loadPrice, setQuantity, incrQuantity, decrQuantity } from '../actions'


class PlayPage extends Component {
    constructor(props) {
        super(props)
        this.renderPlay = this.renderPlay.bind(this)
        this.renderPrice = this.renderPrice.bind(this)
        this.handlePlayClick = this.handlePlayClick.bind(this)
        this.handlePriceClick = this.handlePriceClick.bind(this)
    }

    componentWillMount() {
        this.props.loadPlay(1)
        //this.props.loadPrice()
        console.log('component will mount')
    }

    //componentWillReceiveProps(nextProps) {
    //    this.props.loadPlay();
    //}

    handlePlayClick(play, evt) {
        console.log('play info')
        console.log(play)
        this.props.loadPrice(play.id)
    }

    handlePriceClick(price, evt) {
        const { setQuantity  } = this.props
        console.log('price info')
        console.log(price)
        setQuantity(price.price)
    }

    renderPlay(play) {
        return (
            <a className="play" href="javascript:void(0);" key={play.id} onClick={ (event) => this.handlePlayClick(play, event) }>{play.name}</a>
        )
    }

    renderPrice(price) {
        return (
            <a className="play" href="javascript:void(0);" key={price.id} onClick={ (event) => this.handlePriceClick(price, event) }>{price.price}元</a>
        )
    }

    render() {
        const { incrQuantity, decrQuantity } = this.props
        return (
            <div>
                <div>场次</div>
                <hr />
                {this.props.plays.plays.map(this.renderPlay)}
                <div>价格</div>
                {this.props.prices.prices.map(this.renderPrice)}
                <div>购买数量</div>
                <input size="45" ref="quantity" value={this.props.quantity} />
                <button onClick={ incrQuantity }>+</button>
                {' '}
                <button onClick={ decrQuantity }>-</button>
            </div>
        )
    }
}

PlayPage.propTypes = {
    plays: PropTypes.object,
    prices: PropTypes.object,
    loadPlay: PropTypes.func.isRequired,
    loadPrice: PropTypes.func.isRequired,
    setQuantity: PropTypes.func.isRequired,
    incrQuantity: PropTypes.func.isRequired,
    decrQuantity: PropTypes.func.isRequired,
    quantity: PropTypes.number.isRequired
}

function mapStateToProps(state) {
    console.log('map......')
    return {
        plays: state.plays,
        prices: state.prices,
        quantity: state.quantity
    }
}

export default connect(mapStateToProps, {
    loadPlay, loadPrice, setQuantity, incrQuantity, decrQuantity
})(PlayPage)
