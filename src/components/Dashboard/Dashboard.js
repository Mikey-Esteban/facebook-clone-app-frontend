import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import axiosApiInstance from '../interceptor'
import styled from 'styled-components'
import Navbar from '../Navbar'
import FriendRequests from './FriendRequests/FriendRequests'

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
  const [ friends, setFriends ] = useState([])
  const [ nonFriendedUsers, setNonFriendedUsers ] = useState([])
  const [ sentFriendRequests, setSentFriendRequests ] = useState([])
  const [ receivedFriendRequests, setReceivedFriendRequests ] = useState([])

  useEffect( () => {
    // set timeout function to display login message
    const timer = setTimeout(() => {
      document.querySelector('.timedMessage').style.display = 'none';
    }, 5000)

    // Api call to set friends
    axiosApiInstance.get(`http://localhost:3000/api/v1/users/${currentUser.id}`)
      .then( resp => {
        debugger
        setFriends(resp.data.data.attributes.friendships)
      })
      .catch( resp => console.log(resp))

    // Api call for sentFriendRequests & receivedFriendRequests
    axiosApiInstance.get('http://localhost:3000/api/v1/users')
      .then( resp => {
        debugger
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

        // grab non friended users and users without any requests
        const friend_ids = friends.map( item => item.id )
        const otherUsers = resp.data.data.filter( item => {
          return parseInt(item.id) !== currentUser.id && friend_ids.includes(parseInt(item.id)) === false
        })
        setNonFriendedUsers(otherUsers)
      })
      .catch( resp => console.log(resp))

    return () => clearTimeout(timer)
  }, [currentUser.id, receivedFriendRequests.length, friends.length])

  const handleSendFriendRequest = (receiver_id) => {
    const data = {
      requestor_id: currentUser.id,
      receiver_id: receiver_id,
      status: 'pending'
    }
    axiosApiInstance.post('http://localhost:3000/api/v1/friend_requests', data)
      .then( resp => {
        debugger
        const newSentRequest = resp.data.data
        setSentFriendRequests([...sentFriendRequests, newSentRequest])
      })
      .catch( resp => console.log(resp))
  }

  const handleAcceptFriendRequest = (friendRequest) => {
    console.log('in Dashboard handleAcceptFriendRequest');
    const id = friendRequest.id
    delete friendRequest.attributes.requestor_name
    delete friendRequest.attributes.receiver_name
    friendRequest.attributes.status = 'accepted'

    const data = { friend_request: {...friendRequest.attributes, ['id']:id} }

    axiosApiInstance.patch(`http://localhost:3000/api/v1/friend_requests/${id}`, data)
      .then( resp => {
        debugger
        // add requestor to friends
        const newFriend = nonFriendedUsers.filter( item => item.id === friendRequest.attributes.requestor_id.toString() )[0]
        const newFriends = friends.push(newFriend)
        setFriends(newFriends)
      })
      .catch( resp => console.log(resp))
  }

  return (
    <Fragment>
      <StatusWrapper className="timedMessage">{props.location.state.statusMessage.text}</StatusWrapper>
      <Navbar user={props.location.state.user}
        sentFriendRequests={sentFriendRequests}
        receivedFriendRequests={receivedFriendRequests}
      />
      <DashboardWrapper>
        <FriendRequests
          nonFriendedUsers={nonFriendedUsers} friends={friends}
          sentFriendRequests={sentFriendRequests}
          receivedFriendRequests={receivedFriendRequests}
          handleSendFriendRequest={handleSendFriendRequest}
          handleAcceptFriendRequest={handleAcceptFriendRequest}
        />
      </DashboardWrapper>
    </Fragment>
  )
}

export default Dashboard
