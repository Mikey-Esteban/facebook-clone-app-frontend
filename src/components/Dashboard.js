import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Navbar from './Navbar'
import FriendRequests from './FriendRequests'

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
      </DashboardWrapper>
    </Fragment>
  )
}

export default Dashboard
