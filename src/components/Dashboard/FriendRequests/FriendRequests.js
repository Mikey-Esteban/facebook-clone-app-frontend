import React, { Fragment } from 'react'
import styled from 'styled-components'
import Users from './Users'

const MenuList = styled.ul`
  li {
    padding: 5px 10px;

    ${'' /* background: #ffffff; */}
    border-left: 1px solid #979797;
    color: #666666;
    font-size: 14px;
    list-style: none;
  }
`

const MenuLabel = styled.p`
  color: #666666; /* dark gray */
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`

const FriendRequests = (props) => {

  const { nonFriendedUsers, friends,
    sentFriendRequests, receivedFriendRequests } = props

  const checkFriendRequestStatus = (user_id) => {
    const sentStatusObj = sentFriendRequests.filter( item => item.attributes.receiver_id.toString() === user_id )
    const receivedStatusObj = receivedFriendRequests.filter( item => item.attributes.requestor_id.toString() === user_id )

    let status = null, user = null
    if (sentStatusObj.length > 0) {
      status = sentStatusObj[0]['attributes']['status']
      user = 'sender'
    }
    if (receivedStatusObj.length > 0) {
      status = receivedStatusObj[0]['attributes']['status']
      user = 'receiver'
    }
    return {status, user}
  }

  // split nonFriended users into noRequest, sentRequests, respondBack groups
  const noRequestUsers = [], sentRequestUsers = [], receivedRequestUsers = []
  nonFriendedUsers.forEach(item => {
    const { status, user } = checkFriendRequestStatus(item.id)
    if (status === null) { noRequestUsers.push(item) }
    if (user === 'sender') { sentRequestUsers.push(item) }
    if (user === 'receiver') { receivedRequestUsers.push(item) }
  })

  const nonFriendsList = noRequestUsers.map( item => {
    return(
      <Users key={item.id}
        handleSendFriendRequest={props.handleSendFriendRequest}
        user={item}
        status={null}
        actor={null}
      />
    )
  })

  const friendsList = friends.map( item => {
    return(
      <Users key={item.id}
        user={item}
        status={'accepted'}
        actor={null}
      />
    )
  })


  const sentFriendRequestsList = sentRequestUsers.map( item => {
    return(
      <Users key={item.id}
        user={item}
        status={'pending'}
        actor={'sender'}
      />
    )
  })

  const receivedFriendRequestsList = receivedRequestUsers.map( item => {
    const friendRequestArr = receivedFriendRequests.filter( fr => fr.attributes.requestor_id.toString() === item.id )
    return(
      <Users key={item.id}
        handleAcceptFriendRequest={props.handleAcceptFriendRequest}
        handleDeleteFriendRequest={props.handleDeleteFriendRequest}
        user={item}
        status={'pending'}
        actor={'receiver'}
        friendRequest={friendRequestArr[0]}
      />
    )
  })

  return (
    <Fragment>
      <div className="received-friend-requests-status">
        <MenuLabel>Respond back!</MenuLabel>
        <MenuList>{receivedFriendRequestsList}</MenuList>
      </div>
      <div className="friended-users">
        <MenuLabel>Friends List</MenuLabel>
        <MenuList>{friendsList}</MenuList>
      </div>
      <div className="non-friended-users">
        <MenuLabel>People to friend...</MenuLabel>
        <MenuList>{nonFriendsList}</MenuList>
      </div>
      <div className="sent-friend-requests-status">
        <MenuLabel>Sent requests</MenuLabel>
        <MenuList>{sentFriendRequestsList}</MenuList>
      </div>

    </Fragment>
  )
}

export default FriendRequests
