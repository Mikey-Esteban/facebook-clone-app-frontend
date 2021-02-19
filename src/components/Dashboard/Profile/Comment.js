import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #979797; /* dark gray */
  border-radius: 10px;
  color: #fff;
  margin: 3px;
  padding: 10px;

  font-size: 12px;
`

const Comment = ({comment}) => {
  return (
    <Wrapper>{comment.commenter} said {comment.text}</Wrapper>
  )
}

export default Comment
