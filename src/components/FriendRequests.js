import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import Users from './Users'

const List = styled.ul`
  li {
    margin: 10px 0;
  }
`

const FriendRequests = (props) => {

  const { currentUser, nonFriendedUsers, friends,
    sentFriendRequests, receivedFriendRequests } = props


  const usersList = nonFriendedUsers.map( item => {
    return(
      <Users key={item.id}
        sentFriendRequests={sentFriendRequests}
        receivedFriendRequests={receivedFriendRequests}
        handleSendFriendRequest={props.handleSendFriendRequest}
        handleAcceptFriendRequest={props.handleAcceptFriendRequest}
        user={item}
      />
    )
  })

  const sentFriendRequestsList = sentFriendRequests.map( item => {
    return (
      <li key={item.id}>
        sender: {item.attributes.requestor_id}, receiver: {item.attributes.receiver_id}, status: {item.attributes.status}
      </li>
    )
  })

  const receivedFriendRequestsList = receivedFriendRequests.map( item => {
    return (
      <li key={item.id}>
        sender: {item.attributes.requestor_id}, receiver: {item.attributes.receiver_id}, status: {item.attributes.status}
      </li>
    )
  })  

  return (
    <Fragment>
      <div>[FriendRequests component]</div>
      <div className="users">
        <p>People to friend...</p>
        <List>{usersList}</List>
      </div>
      <div className="sent-friend-requests-status">
        <p>Sent requests</p>
        <List>{sentFriendRequestsList}</List>
      </div>
      <div className="received-friend-requests-status">
        <p>Respond back!</p>
        <List>{receivedFriendRequestsList}</List>
      </div>
    </Fragment>
  )
}

export default FriendRequests
