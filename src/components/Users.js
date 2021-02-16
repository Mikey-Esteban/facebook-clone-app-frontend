import React, { Fragment } from 'react'
import Button from './UI/buttons/Button'
import LightBlueButton from './UI/buttons/LightBlueButton'
import OrangeButton from './UI/buttons/OrangeButton'
import GrayButton from './UI/buttons/GrayButton'

const Users = (props) => {

  const checkFriendRequestStatus = (user_id) => {
    const sentStatusObj = props.sentFriendRequests.filter( item => item.attributes.receiver_id.toString() === user_id )
    const receivedStatusObj = props.receivedFriendRequests.filter( item => item.attributes.requestor_id.toString() === user_id )

    let status = null, user = null
    if (sentStatusObj.length > 0) {
      status = sentStatusObj[0]['attributes']['status']
      return {status: status, user: 'sender', friendRequest: sentStatusObj[0]}
    } else if (receivedStatusObj.length > 0) {
      status = receivedStatusObj[0]['attributes']['status']
      return {status: status, user: 'receiver', friendRequest: receivedStatusObj[0]}
    } else {
      return {status, user}
    }
  }

  const friendRequestButton = (user_id) => {
    const {status, user, friendRequest} = checkFriendRequestStatus(user_id)
    if ( status === 'pending' && user === 'sender' ) {
      return <LightBlueButton> sent! </LightBlueButton>
    } else if (status === 'pending' && user === 'receiver' ) {
      return (
        <Fragment>
          <LightBlueButton onClick={() => props.handleAcceptFriendRequest(friendRequest)}>
            accept
          </LightBlueButton>
          <Button>reject</Button>
        </Fragment>
      )
    }  else if ( status === null || status === 'rejected' ) {
      return (
        <OrangeButton onClick={() => props.handleSendFriendRequest(user_id)}>
          send request
        </OrangeButton>
      )
    } else if ( status === 'accepted' ) {
      return <GrayButton>friend</GrayButton>
    }
  }
  return (
    <li key={props.user.id}>
      {props.user.attributes.name}
      { friendRequestButton(props.user.id) }
    </li>
  )
}

export default Users
