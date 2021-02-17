import React, { useState } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import Notifications from './Notifications'
import GrayButton from '../UI/buttons/GrayButton'

const Wrapper = styled.div`
  position: absolute;
  top: 0;

  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
`

const Navbar = () => {

  const [ redirect, setRedirect ] = useState(false)

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

  return (
    <Wrapper>
      [This is my Navbar component]
      <Notifications />
      <GrayButton onClick={handleLogOut}>Log out</GrayButton>
    </Wrapper>
  )
}

export default Navbar
