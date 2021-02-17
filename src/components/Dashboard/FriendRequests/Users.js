import React, { Fragment } from 'react'
import Button from '../../UI/buttons/Button'
import LightBlueButton from '../../UI/buttons/LightBlueButton'
import OrangeButton from '../../UI/buttons/OrangeButton'
import GrayButton from '../../UI/buttons/GrayButton'

const Users = (props) => {

  const friendRequestButton = (user_id) => {

    if ( props.status === 'pending' && props.actor === 'sender' ) {
      return <LightBlueButton> sent! </LightBlueButton>
    } else if (props.status === 'pending' && props.actor === 'receiver' ) {
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
        <OrangeButton onClick={() => props.handleSendFriendRequest(user_id)}>
          send request
        </OrangeButton>
      )
    } else if ( props.status === 'accepted' ) {
      return <GrayButton>friend</GrayButton>
    }
  }

  return (
    <li key={props.user.id}>
      {props.user.attributes && props.user.attributes.name}
      {props.user.name && props.user.name}
      { friendRequestButton(props.user.id) }
    </li>
  )
}

export default Users
