import React from 'react'

const Post = (props) => {
  console.log(props);
  return (
    <div>Post: {props.attributes.text}</div>
  )
}

export default Post
