import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router'
import Login from './Login'
import GetStarted from './GetStarted'

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  padding-top: 20px;
  width: 400px;

  border: 1px solid #eae7dc; /* light-gray */
  z-index: 1;
`

const StatusWrapper = styled.div`
  position: absolute;
  top: 0;
  padding-left: 20px;
  font-weight: 600;
  color: #d0102b; /* red */
`

const GetStartedWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  right: 20px;
  z-index: -1;
`

const Home = () => {

  const [ user, setUser ] = useState({})
  const [ currentUser, setCurrentUser ] = useState({})
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
        setCurrentUser(json.data)
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
        <Login handleChange={handleChange} handleSubmit={handleSubmit} />
      </Wrapper>
      <GetStartedWrapper>
        <GetStarted />
      </GetStartedWrapper>
    </Fragment>
  )
}

export default Home
