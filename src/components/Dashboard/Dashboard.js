import React, { useState, useEffect, Fragment } from 'react'
import axiosApiInstance from '../interceptor'
import styled from 'styled-components'
import Navbar from '../Navbar/Navbar'
import Breadcrumb from './Breadcrumb'
import FriendRequests from './FriendRequests/FriendRequests'
import Feed from './Feed/Feed'
import Profile from './Profile/Profile'

// Context hook for currentUser
export const UserContext = React.createContext()

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  max-width: 800px;
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
  const [ viewFriendRequests, setViewFriendRequests ] = useState(false)
  const [ viewFeed, setViewFeed ] = useState(false)
  const [ viewProfile, setViewProfile ] = useState(false)

  useEffect( () => {
    // set timeout function to erase login message
    const timer = setTimeout(() => {
      document.querySelector('.timedMessage').textContent = '';
    }, 5000)

    // Api call to set friends
    axiosApiInstance.get(`http://localhost:3000/api/v1/users/${currentUser.id}`)
      .then( resp => {
        setFriends(resp.data.data.attributes.friendships)
      })
      .catch( resp => console.log(resp))

    // Api call for sentFriendRequests & receivedFriendRequests
    axiosApiInstance.get('http://localhost:3000/api/v1/users')
      .then( resp => {
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
  }, [currentUser.id, friends.length, sentFriendRequests.length, receivedFriendRequests.length])

  const handleSendFriendRequest = (receiver_id) => {
    const data = {
      requestor_id: currentUser.id,
      receiver_id: receiver_id,
      status: 'pending'
    }
    axiosApiInstance.post('http://localhost:3000/api/v1/friend_requests', data)
      .then( resp => {
        const newSentRequest = resp.data.data
        setSentFriendRequests([...sentFriendRequests, newSentRequest])
      })
      .catch( resp => console.log(resp))
  }

  const cleanUpFriendRequest = (friendRequest) => {
    delete friendRequest.attributes.requestor_name
    delete friendRequest.attributes.receiver_name
    return friendRequest
  }

  const handleAcceptFriendRequest = (friendRequest) => {
    friendRequest = cleanUpFriendRequest(friendRequest)
    friendRequest.attributes.status = 'accepted'

    const data = { friend_request: friendRequest.attributes }

    axiosApiInstance.patch(`http://localhost:3000/api/v1/friend_requests/${friendRequest.id}`, data)
      .then( resp => {
        debugger
        // add requestor to friends
        const newFriend = nonFriendedUsers.filter( item => item.id === friendRequest.attributes.requestor_id.toString() )
        setFriends([...friends, newFriend[0]])
        // delete friend request from db
        handleDeleteFriendRequest(resp.data.data)
      })
      .catch( resp => console.log(resp))
  }

  const handleDeleteFriendRequest = (friendRequest) => {
    friendRequest = cleanUpFriendRequest(friendRequest)
    const data = { friend_request: friendRequest.attributes }

    axiosApiInstance.delete(`http://localhost:3000/api/v1/friend_requests/${friendRequest.id}`, data)
      .then( resp => {
        debugger
        // filter friend request from receivedFriendRequests
        const filteredReceivedRequests = receivedFriendRequests.filter( item => item.id !== friendRequest.id )
        setReceivedFriendRequests(filteredReceivedRequests)
      })
      .catch( resp => console.log(resp))
  }

  const handleViewForm = (id) => {
    setViewFriendRequests(false)
    setViewFeed(false)
    setViewProfile(false)
    if (id === 'friends') {
      setViewFriendRequests(true)
    }
    else if (id === 'feed') {
      setViewFeed(true)
    } else {
      setViewProfile(true)
    }
  }

  return (
    <Fragment>
      <StatusWrapper className="timedMessage">{props.location.state.statusMessage.text}</StatusWrapper>
      <UserContext.Provider value={{currentUser: currentUser, friends: friends}}>
        <Navbar />
        <DashboardWrapper>
          <Breadcrumb handleViewForm={handleViewForm} />
          { viewFriendRequests &&
            <FriendRequests
              nonFriendedUsers={nonFriendedUsers} friends={friends}
              sentFriendRequests={sentFriendRequests}
              receivedFriendRequests={receivedFriendRequests}
              handleSendFriendRequest={handleSendFriendRequest}
              handleAcceptFriendRequest={handleAcceptFriendRequest}
              handleDeleteFriendRequest={handleDeleteFriendRequest}
            />
          }
          { viewFeed &&
            <Feed />
          }
          { viewProfile &&
            <Profile />
          }
        </DashboardWrapper>
      </UserContext.Provider>
    </Fragment>
  )
}

export default Dashboard
