import React, { useEffect, Fragment } from 'react'
import styled from 'styled-components'

const StatusWrapper = styled.div`
  position: absolute;
  top: 0;
  padding-left: 20px;
  font-weight: 600;
  color: #0088cc; /* blue */
`

const Dashboard = (props) => {
  console.log(props)

  useEffect( () => {
    const timer = setTimeout(() => {
      document.querySelector('.timedMessage').style.display = 'none';
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Fragment>
      <StatusWrapper className="timedMessage">{props.location.state.statusMessage.text}</StatusWrapper>
      <div>[This is my Dashboard component]</div>
    </Fragment>
  )
}

export default Dashboard
