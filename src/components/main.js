import React, { Component } from 'react'
import Intro from './intro.js'
import Posts from './posts.js'

export default class Main extends Component {
  constructor(props) {
    super(props);
      this.state = {
        name: "edy"
      }
  }

  getName = (number) => {
    const name = number + this.state.name;
    return name
  } 

  render() {
    return (
      <div>
        <p className="App-intro">
          {this.getName(400)}
        </p>
        <div>
          <Intro msg={this.getName(500)}/>
        </div>
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
        <Posts/>
      </div>
    )
  }
}
