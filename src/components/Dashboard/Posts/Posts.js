import React from 'react'
import styled from 'styled-components'
import Post from './Post'

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
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
