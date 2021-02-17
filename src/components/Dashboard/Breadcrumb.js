import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 300px;

  color: #0088cc; /* light blue */

  p {
    cursor: pointer;
  }
`

const Breadcrumb = (props) => {
  return (
    <Wrapper>
      <p onClick={() => props.handleViewForm('friends')}>Friends</p>
      /
      <p onClick={() => props.handleViewForm('feed')}>News Feed</p>
      /
      <p onClick={() => props.handleViewForm('profile')}>Profile</p>
    </Wrapper>
  )
}

export default Breadcrumb
