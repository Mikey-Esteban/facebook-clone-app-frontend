import React from 'react'
import styled from 'styled-components'
import NewPost from './NewPost'
import Posts from './Posts'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Feed = () => {
  return (
    <Wrapper>
      <div>[This is the Feed component]</div>
      <NewPost />
      <Posts />
    </Wrapper>
  )
}

export default Feed
