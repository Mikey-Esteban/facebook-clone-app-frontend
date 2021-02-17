import React from 'react'
import styled from 'styled-components'
import NewPost from './NewPost'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Feed = () => {
  return (
    <Wrapper>
      <div>[This is the Feed component]</div>
      <NewPost />
      <div>[Show friend posts goes here]</div>
    </Wrapper>
  )
}

export default Feed
