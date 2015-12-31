import React, { Component } from 'react'

export default class Explore extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <p>Type a username or repo full name and hit 'Go':</p>
        <p>
          Move the DevTools with Ctrl+W or hide them with Ctrl+H.
        </p>
      </div>
    )
  }
}

