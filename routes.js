import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import PlayPage from './containers/PlayPage'

export default (
  <Route path="/" component={App}>
    <Route path="/plays/:play_id"
           component={PlayPage} />
  </Route>
)
