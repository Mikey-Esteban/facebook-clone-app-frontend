import React, { Fragment } from 'react'
import styled from 'styled-components'

const Helper = styled.div`
  color: #d0102b; /* red */
  font-size: 12px;
`
const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 0px 10px 10px 20px;

  background: #eeeeee; /* light gray */
  color: #666666; /* dark gray */
  font-size: 12px;

  h4 {
    align-self: center;
  }
`

const GetStarted = () => {
  return (
    <Fragment>
      <Helper>Get started right away with these users</Helper>
      <DropdownWrapper>
        <h4>EMAIL | PASSWORD</h4>
        <div>email0@email.com | password</div>
        <div>email1@email.com | password</div>
        <div>email2@email.com | password</div>
        <div>email3@email.com | password</div>
        <div>email4@email.com | password</div>
        <div>email5@email.com | password</div>
        <div>email6@email.com | password</div>
        <div>email7@email.com | password</div>
        <div>email8@email.com | password</div>
        <div>email9@email.com | password</div>
      </DropdownWrapper>
    </Fragment>
  )
}

export default GetStarted
