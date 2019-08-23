import React, { Component } from 'react'

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: this.props.msg
    }
  }
  
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({
        msg: json.title
      })
    })
    .catch(e => console.error(e))
  }
  render() {
    return (
      <div>
        <h1>
          {this.state.msg} doo something
        </h1>
      </div>
    )
  }
}
