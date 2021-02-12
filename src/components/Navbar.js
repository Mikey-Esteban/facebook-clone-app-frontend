import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  top: 0;

  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  width: 100%;

  ${'' /* background: #efefef; */}
`

const Navbar = (props) => {
  console.log(props);
  return (
    <Wrapper>[This is my Navbar component]</Wrapper>
  )
}

export default Navbar
