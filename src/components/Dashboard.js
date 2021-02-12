import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Navbar from './Navbar'

const StatusWrapper = styled.div`
  position: absolute;
  top: 0;
  padding-left: 20px;
  font-weight: 600;
  color: #0088cc; /* blue */
`

const Dashboard = (props) => {
  console.log(props)

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
        debugger
        setUsers(resp.data.data)
      })
      .catch( resp => {
        debugger
        console.log(resp)
      })

    return () => clearTimeout(timer)
  }, [])

  const usersList = users.map( item => {
    return( <li>{item.attributes.name}: {item.attributes.email}</li>)
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
