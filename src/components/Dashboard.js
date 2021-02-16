import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Navbar from './Navbar'
import FriendRequests from './FriendRequests'
// import Button from './UI/buttons/Button'
// import LightBlueButton from './UI/buttons/LightBlueButton'
// import OrangeButton from './UI/buttons/OrangeButton'
// import GrayButton from './UI/buttons/GrayButton'

// headers for axios authorization
const headers = {
  'Authorization': localStorage.getItem('token')
}

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  max-width: 300px;
  padding: 20px 40px;

  background: #eee;
  border-radius: 4px;
`

const StatusWrapper = styled.div`
  position: absolute;
  top: 0;
  padding-left: 20px;
  font-weight: 600;
  color: #0088cc; /* blue */
`

// const List = styled.ul`
//   li {
//     margin: 10px 0;
//   }
// `

const Dashboard = (props) => {

  const currentUser = props.location.state.user
  const [ nonFriendedUsers, setNonFriendedUsers ] = useState([])
  const [ friends, setFriends ] = useState(props.location.state.friends)
  const [ sentFriendRequests, setSentFriendRequests ] = useState([])
  const [ receivedFriendRequests, setReceivedFriendRequests ] = useState([])

  useEffect( () => {
    // set timeout function to display login message
    const timer = setTimeout(() => {
      document.querySelector('.timedMessage').style.display = 'none';
    }, 5000)

    // Api call for sentFriendRequests & receivedFriendRequests
    axios.get('http://localhost:3000/api/v1/users', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then( resp => {
        // grab non friended users
        const friend_ids = friends.map( item => item.id )
        const otherUsers = resp.data.data.filter( item => {
          return parseInt(item.id) !== currentUser.id && friend_ids.includes(parseInt(item.id)) === false
        })
        setNonFriendedUsers(otherUsers)
        // grab sent friend requests
        const sentRequests = resp.data.included.filter( item => {
          return item.attributes.requestor_id.toString() === currentUser.id.toString()
        })
        setSentFriendRequests(sentRequests)
        // grab received friend requests
        const receivedRequests = resp.data.included.filter( item => {
          return item.attributes.receiver_id.toString() === currentUser.id.toString()
        })
        setReceivedFriendRequests(receivedRequests)
      })
      .catch( resp => console.log(resp))

    return () => clearTimeout(timer)
  }, [currentUser.id, receivedFriendRequests.length, friends])

  const handleSendFriendRequest = (receiver_id) => {
    const data = {
      requestor_id: currentUser.id,
      receiver_id: receiver_id,
      status: 'pending'
    }
    axios.post('http://localhost:3000/api/v1/friend_requests', data, { headers: headers })
      .then( resp => {
        debugger
        const newSentRequest = resp.data.data
        setSentFriendRequests([...sentFriendRequests, newSentRequest])
      })
      .catch( resp => console.log(resp))
  }

  const handleAcceptFriendRequest = (friendRequest) => {
    const id = friendRequest.id
    friendRequest.attributes.status = 'accepted'
    const data = { friend_request: {...friendRequest.attributes, ['id']:id} }
    axios.patch(`http://localhost:3000/api/v1/friend_requests/${id}`, data, { headers: headers })
      .then( resp => {
        debugger
        const filteredReceivedFRs = receivedFriendRequests.filter(item => item.id !== id)
        setReceivedFriendRequests(filteredReceivedFRs)
      })
      .catch( resp => console.log(resp))
  }

  // const checkFriendRequestStatus = (user_id) => {
  //   const sentStatusObj = sentFriendRequests.filter(item => {
  //     return item.attributes.receiver_id.toString() === user_id
  //   })
  //
  //   const receivedStatusObj = receivedFriendRequests.filter( item => {
  //     return item.attributes.requestor_id.toString() === user_id
  //   })
  //
  //   let status = null
  //   let user = null
  //   if (sentStatusObj.length > 0) {
  //     status = sentStatusObj[0]['attributes']['status']
  //     return {status: status, user: 'sender', friendRequest: sentStatusObj[0]}
  //   } else if (receivedStatusObj.length > 0) {
  //     status = receivedStatusObj[0]['attributes']['status']
  //     return {status: status, user: 'receiver', friendRequest: receivedStatusObj[0]}
  //   } else {
  //     return {status, user}
  //   }
  // }

  // const friendRequestButton = (user_id) => {
  //   const {status, user, friendRequest} = checkFriendRequestStatus(user_id)
  //   if ( status === 'pending' && user === 'sender' ) {
  //     return <LightBlueButton> sent! </LightBlueButton>
  //   } else if (status === 'pending' && user === 'receiver' ) {
  //     return (
  //       <Fragment>
  //         <LightBlueButton onClick={() => handleAcceptFriendRequest(friendRequest)}>
  //           accept
  //         </LightBlueButton>
  //         <Button>reject</Button>
  //       </Fragment>
  //     )
  //   }  else if ( status === null || status === 'rejected' ) {
  //     return (
  //       <OrangeButton onClick={() => handleSendFriendRequest(user_id)}>
  //         send request
  //       </OrangeButton>
  //     )
  //   } else if ( status === 'accepted' ) {
  //     return <GrayButton>friend</GrayButton>
  //   }
  // }

  // const usersList = users.map( item => {
  //   return(
  //     <li key={item.id}>
  //       {item.attributes.name}
  //       { friendRequestButton(item.id) }
  //     </li>
  //   )
  // })

  // const sentFriendRequestsList = sentFriendRequests.map( item => {
  //   return (
  //     <li key={item.id}>
  //       sender: {item.attributes.requestor_id}, receiver: {item.attributes.receiver_id}, status: {item.attributes.status}
  //     </li>
  //   )
  // })
  //
  // const receivedFriendRequestsList = receivedFriendRequests.map( item => {
  //   return (
  //     <li key={item.id}>
  //       sender: {item.attributes.requestor_id}, receiver: {item.attributes.receiver_id}, status: {item.attributes.status}
  //     </li>
  //   )
  // })

  return (
    <Fragment>
      <StatusWrapper className="timedMessage">{props.location.state.statusMessage.text}</StatusWrapper>
      <Navbar user={props.location.state.user} sentFriendRequests={sentFriendRequests} />
      <DashboardWrapper>
        <FriendRequests
          currentUser={currentUser} nonFriendedUsers={nonFriendedUsers} friends={friends}
          sentFriendRequests={sentFriendRequests}
          handleSendFriendRequest={handleSendFriendRequest}
          handleAcceptFriendRequest={handleAcceptFriendRequest}
          receivedFriendRequests={receivedFriendRequests}
        />
        {/* <div>[This is my Dashboard component]</div>
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
        </div> */}
      </DashboardWrapper>
    </Fragment>
  )
}

export default Dashboard
