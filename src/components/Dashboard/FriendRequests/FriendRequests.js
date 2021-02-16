import React, { Fragment } from 'react'
import styled from 'styled-components'
import Users from './Users'


const List = styled.ul`
  li {
    margin: 10px 0;
  }
`

const FriendRequests = (props) => {
  console.log('Friend Request props', props);
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
    console.log(item);
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
        user={item}
        status={'pending'}
        actor={'receiver'}
        friendRequest={friendRequestArr[0]}
      />
    )
  })

  return (
    <Fragment>
      <div>[FriendRequests component]</div>
      <div className="received-friend-requests-status">
        <p>Respond back!</p>
        <List>{receivedFriendRequestsList}</List>
      </div>
      <div className="friended-users">
        <p>Friends List</p>
        <List>{friendsList}</List>
      </div>
      <div className="non-friended-users">
        <p>People to friend...</p>
        <List>{nonFriendsList}</List>
      </div>
      <div className="sent-friend-requests-status">
        <p>Sent requests</p>
        <List>{sentFriendRequestsList}</List>
      </div>

    </Fragment>
  )
}

export default FriendRequests
