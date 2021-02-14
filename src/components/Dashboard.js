import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Navbar from './Navbar'
import Button from './UI/Button'
import LightBlueButton from './UI/LightBlueButton'

const StatusWrapper = styled.div`
  position: absolute;
  top: 0;
  padding-left: 20px;
  font-weight: 600;
  color: #0088cc; /* blue */
`

const Dashboard = (props) => {
  console.log(props)

  const currentUser = props.location.state.user
  const [ users, setUsers ] = useState([])
  const [ sentFriendRequests, setSentFriendRequests ] = useState([])

  useEffect( () => {
    // set timeout function to display login message
    const timer = setTimeout(() => {
      document.querySelector('.timedMessage').style.display = 'none';
    }, 5000)


    axios.get('http://localhost:3000/api/v1/users', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then( resp => {
        // grab other users
        const otherUsers = resp.data.data.filter( item => {
          return item.id !== currentUser.id.toString()
        })
        setUsers(otherUsers)
        // grab sent friend requests
        const friendRequests = resp.data.included.filter( item => {
          return item.attributes.requestor_id.toString() === currentUser.id.toString()
        })
        setSentFriendRequests(friendRequests)
      })
      .catch( resp => console.log(resp))

    return () => clearTimeout(timer)
  }, [currentUser.id])

  const handleFriendRequest = (receiver_id) => {
    const data = {
      requestor_id: currentUser.id,
      receiver_id: receiver_id,
      status: 'pending'
    }
    axios.post('http://localhost:3000/api/v1/friend_requests', data, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then( resp => {
        debugger
      })
      .catch( resp => console.log(resp))
  }

  const checkFriendRequestStatus = (user_id) => {
    const statusObj = sentFriendRequests.filter(item => {
      return item.attributes.receiver_id.toString() === user_id
    })

    if (statusObj.length > 0) {
      const status = statusObj[0]['attributes']['status']
      return status
    } else {
      return null
    }
  }

  const friendRequestButton = (user_id) => {
    const status = checkFriendRequestStatus(user_id)
    if ( status === 'pending' ) {
      return <LightBlueButton> sent! </LightBlueButton>
    } else if ( status === null || status === 'rejected' ) {
      return (
        <Button onClick={() => handleFriendRequest(user_id)}>
          send request
        </Button>
      )
    } else if ( status === 'accepted' ) {
      return null
    }
  }

  const usersList = users.map( item => {
    return(
      <li key={item.id}>
        {item.attributes.name}
        { friendRequestButton(item.id) }
      </li>
    )
  })

  const friendRequestsList = sentFriendRequests.map( item => {
    return (
      <li key={item.id}>
        sender: {item.attributes.requestor_id}, receiver: {item.attributes.receiver_id}, status: {item.attributes.status}
      </li>
    )
  })

  return (
    <Fragment>
      <StatusWrapper className="timedMessage">{props.location.state.statusMessage.text}</StatusWrapper>
      <Navbar user={props.location.state.user} />
      <div>[This is my Dashboard component]</div>
      <div className="users">
        <p>People to friend...</p>
        <ul>{usersList}</ul>
      </div>
      <div className="friend-requests-status">
        <p>Sent requests</p>
        <ul>{friendRequestsList}</ul>
      </div>
    </Fragment>
  )
}

export default Dashboard
