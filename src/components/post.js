import React, { Component } from 'react'

export default class Post extends Component {

  render() {
    return (
      <div className="post">
        <h3>{this.props.title}</h3>
        <div>{this.props.body}</div>
      </div>
    )
  }
}
