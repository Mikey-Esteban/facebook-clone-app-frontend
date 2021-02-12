import React from 'react'
import styled from 'styled-components'
import Dropdown from './UI/Dropdown'

const Wrapper = styled.div`
  position: absolute;
  top: 0;

  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;

  ${'' /* background: #efefef; */}
`

const Navbar = (props) => {

  const list = [
    {id: 0, title: 'first'},
    {id: 1, title: 'second'},
    {id: 2, title: 'third'},
    {id: 3, title: 'fourth'}
  ]
  return (
    <Wrapper>
      [This is my Navbar component]
      <Dropdown list={list} />
    </Wrapper>
  )
}

export default Navbar
