import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import GoodsPage from './containers/GoodsPage'
import OrdersPage from './containers/OrdersPage'

export default (
  <Route path="/" component={App}>
    <Route path="/goods/:feedid" component={GoodsPage} />
    <Route path="/orders/:orderid" component={OrdersPage} />
  </Route>
)
