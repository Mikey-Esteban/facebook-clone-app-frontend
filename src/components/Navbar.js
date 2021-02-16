import React, { useState } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import Dropdown from './UI/Dropdown'
import GrayButton from './UI/buttons/GrayButton'

const Wrapper = styled.div`
  position: absolute;
  top: 0;

  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
`

const Navbar = (props) => {
  console.log('Navbar props', props);

  const { sentFriendRequests, receivedFriendRequests } = props
  const notifications = []
  const [ redirect, setRedirect ] = useState(false)

  const acceptedSentFriendRequests = sentFriendRequests.filter( item => item.attributes.status === 'accepted' )
  acceptedSentFriendRequests.forEach(item => {
    const data = {
      id: item.id,
      title: `${item.attributes['receiver_name']} added you back as a friend!`
    }
    notifications.push(data)
  })

  receivedFriendRequests.forEach(item => {
    const data = {
      id: item.id,
      title: `${item.attributes['requestor_name']} sent you a friend request!`
    }
    notifications.push(data)
  })


  const handleLogOut = () => {
    fetch('http://localhost:3000/logout', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(res => {
        if(res.ok) {
          return res.json()
        } else {
          return res.json().then(json => Promise.reject(json))
        }
      })
      .then(json => {
        console.dir(json)
        localStorage.removeItem('token')
        setRedirect(true)
      })
      .catch(err => console.error(err))
  }

  if (redirect) {
    return <Redirect to={'/'} />
  }


  console.log(notifications);

  return (
    <Wrapper>
      [This is my Navbar component]
      <Dropdown list={notifications} headerTitle={`${notifications.length} notifications`} />
      <GrayButton onClick={handleLogOut}>Log out</GrayButton>
    </Wrapper>
  )
}

export default Navbar
