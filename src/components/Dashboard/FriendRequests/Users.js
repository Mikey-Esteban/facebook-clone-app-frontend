import React, { Fragment } from 'react'
import styled from 'styled-components'
import Button from '../../UI/buttons/Button'
import LightBlueButton from '../../UI/buttons/LightBlueButton'
import DarkBlueButton from '../../UI/buttons/DarkBlueButton'

const List = styled.li`
  display: flex;
  align-items: baseline;
`


const ButtonWrapper = styled.div`
  margin-left: 5px;

  button {
    padding: 8px 16px;
    font-size: 12px;
  }
`

const Users = (props) => {

  const friendRequestButton = (user_id) => {

  if (props.status === 'pending' && props.actor === 'receiver' ) {
      return (
        <Fragment>
          <LightBlueButton onClick={() => props.handleAcceptFriendRequest(props.friendRequest)}>
            accept
          </LightBlueButton>
          <Button onClick={() => props.handleDeleteFriendRequest(props.friendRequest)}>reject</Button>
        </Fragment>
      )
    }  else if ( props.status === null || props.status === 'rejected' ) {
      return (
        <DarkBlueButton onClick={() => props.handleSendFriendRequest(user_id)}>
          send request
        </DarkBlueButton>
      )
    }
  }

  return (
    <List key={props.user.id}>
      {props.user.attributes && props.user.attributes.name}
      {props.user.name && props.user.name}
      <ButtonWrapper>{ friendRequestButton(props.user.id) }</ButtonWrapper>
    </List>
  )
}

export default Users
