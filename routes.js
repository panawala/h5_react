import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import GoodsPage from './containers/GoodsPage'

export default (
  <Route path="/" component={App}>
    <Route path="/goods/:feedid" component={GoodsPage} />
  </Route>
)
