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

  const { sentFriendRequests } = props
  const [ redirect, setRedirect ] = useState(false)

  const list = [
    {id: 0, title: 'first'},
    {id: 1, title: 'second'},
    {id: 2, title: 'third'},
    {id: 3, title: 'fourth'}
  ]

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

  const acceptedSentFriendRequests = sentFriendRequests.filter( item => item.attributes.status === 'accepted' )
  const acceptedList = acceptedSentFriendRequests.map(item => {
    return ({
      id: item.id,
      title: `${item.attributes['receiver_name']} added you back as a friend!`
    })
  })

  if (redirect) {
    return <Redirect to={'/'} />
  }


  return (
    <Wrapper>
      [This is my Navbar component]
      <Dropdown list={list} />
      <Dropdown list={acceptedList} headerTitle={`${acceptedList.length} notifications`} />
      <GrayButton onClick={handleLogOut}>Log out</GrayButton>
    </Wrapper>
  )
}

export default Navbar
