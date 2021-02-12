import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Navbar from './Navbar'
import Button from './UI/Button'

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

  useEffect( () => {
    const timer = setTimeout(() => {
      document.querySelector('.timedMessage').style.display = 'none';
    }, 5000)

    axios.get('http://localhost:3000/api/v1/users', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then( resp => {
        const otherUsers = resp.data.data.filter( item => item.id !== currentUser.id.toString() )
        setUsers(otherUsers)
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

  const usersList = users.map( item => {
    return(
      <li key={item.id}>
        {item.attributes.name}
        <Button onClick={() => handleFriendRequest(item.id)}>
          send request
        </Button>
      </li>
    )
  })

  return (
    <Fragment>
      <StatusWrapper className="timedMessage">{props.location.state.statusMessage.text}</StatusWrapper>
      <Navbar user={props.location.state.user} />
      <div>[This is my Dashboard component]</div>
      <ul>{usersList}</ul>
    </Fragment>
  )
}

export default Dashboard
