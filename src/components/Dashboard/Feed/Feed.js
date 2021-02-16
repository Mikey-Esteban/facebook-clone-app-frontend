import React, { Fragment } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Feed = () => {
  return (
    <Wrapper>
      <div>[This is the Feed component]</div>
      <div>[Create post form goes here]</div>
      <div>[Show friend posts goes here]</div>
    </Wrapper>
  )
}

export default Feed
