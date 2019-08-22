import React, { Component } from 'react'

export default class Main extends Component {
  render() {
    return (
      <div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form action="">
          <fieldset>
            <legend>name</legend>
            <input type="text" name="name" id="name"/>
          </fieldset>
          <fieldset>
            <legend>email</legend>
            <input type="email" name="email" id="email"/>
          </fieldset>
          <fieldset>
            <button type="submit">Send</button>
          </fieldset>
        </form>
      </div>
    )
  }
}
