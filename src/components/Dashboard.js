import React, { Fragment } from 'react'
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

  return (
    <Fragment>
      <StatusWrapper>{props.location.state.statusMessage.text}</StatusWrapper>
      <div>[This is my Dashboard component]</div>
    </Fragment>
  )
}

export default Dashboard
