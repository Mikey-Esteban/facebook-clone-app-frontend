import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router'
import Login from './Login'

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  width: 400px;

  border: 1px solid #eae7dc; /* light-gray */
`

const StatusWrapper = styled.div`
  position: absolute;
  top: 0;
  padding-left: 20px;
  font-weight: 600;
  color: #d0102b; /* red */
`

const Home = () => {

  const [ user, setUser ] = useState({})
  const [ currentUser, setCurrentUser ] = useState({})
  const [ currentUserFriends, setCurrentUserFriends ] = useState([])
  const [ statusMessage, setStatusMessage ] = useState({})
  const [ redirect, setRedirect ] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    fetch('http://localhost:3000/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "user": user })
    })
      .then(res => {
        if(res.ok) {
          console.log(res.headers.get('Authorization'))
          localStorage.setItem('token', res.headers.get('Authorization'))
          return res.json()
        } else {
          return res.text().then(text => {
            setStatusMessage({'text': text, 'code': 400})
            Promise.reject(text)
          });
        }
      })
      .then(json => {
        console.dir(json)
        debugger
        setCurrentUser(json.data)
        setCurrentUserFriends(json.data.friendships)
        setStatusMessage({'text': json.status.message, 'code': 200})
        setRedirect(true)
      })
      .catch(err => console.error(err))
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
  }

  if (redirect) {
    console.log('in redirect clause');
    return (
      <Redirect to=
        {{
          pathname: '/dashboard',
          state: {
            user: currentUser,
            friends: currentUserFriends,
            statusMessage: statusMessage
          }
        }}
      />
    )
  }

  return (
    <Fragment>
      { statusMessage &&
        <StatusWrapper>{statusMessage.text}</StatusWrapper>
      }
      <Wrapper>
        <div>[Hello world from App component]</div>
        <Login handleChange={handleChange} handleSubmit={handleSubmit} />
      </Wrapper>
    </Fragment>
  )
}

export default Home
