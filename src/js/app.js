import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {

  render () {
    return (
      <div>
        <h1>App</h1>
      </div>
    )
  }

}

render(<App />, document.getElementById('app__root'))