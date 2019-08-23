import React, { Component } from 'react'
import Post from './post'

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        title: "Empty",
        body: "No posts find"
      }]
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      this.setState({
        data: json
      })
    })
    .catch(e => console.error(e))
  }
  
  render() {
    return (
      <div>
        {this.state.data.map( (item, key ) => 
          <Post title={item.title} body={item.body} key={key}/>
        )}
      </div>
    )
  }
}
