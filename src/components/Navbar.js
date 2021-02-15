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
  const { sentFriendRequests } = props

  const list = [
    {id: 0, title: 'first'},
    {id: 1, title: 'second'},
    {id: 2, title: 'third'},
    {id: 3, title: 'fourth'}
  ]

  const acceptedSentFriendRequests = sentFriendRequests.filter( item => item.attributes.status === 'accepted' )
  const acceptedList = acceptedSentFriendRequests.map(item => {
    return ({
      id: item.id,
      title: `${item.attributes['receiver_name']} added you back as a friend!`
    })
  })

  return (
    <Wrapper>
      [This is my Navbar component]
      <Dropdown list={list} />
      <Dropdown list={acceptedList} headerTitle={'notifications'} />
    </Wrapper>
  )
}

export default Navbar
