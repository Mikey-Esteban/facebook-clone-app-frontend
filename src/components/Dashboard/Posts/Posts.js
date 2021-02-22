import React from 'react'
import styled from 'styled-components'
import Post from './Post'

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`

const Posts = (props) => {

  const posts = props.posts
  const postsList = posts.map( item => <Post key={item.id} post={item}  />)

  return (
    <CardWrapper>
      {postsList}
    </CardWrapper>
  )
}

export default Posts
