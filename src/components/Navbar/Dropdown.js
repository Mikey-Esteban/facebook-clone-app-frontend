import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 200px;
`

const Header = styled.div`
  position: relative;
  color: #666666; /* dark gray */
  font-size: 14px;
`

const IconWrapper = styled.div`
  position: relative;
  float: right;
  width: 20px;
  height: 20px;

  border: 1px solid #666666;  /* dark gray */
  border-radius: 50%;
  margin-right: 5px;
  padding: 8px;

  background: #666666; /* dark gray */
  color: #eeeeee; /* light gray */
  cursor: pointer;
  text-align: center;
  transition: all ease-in-out 100ms;

  &:hover {
    background: #979797; /* medium gray */
    border: 1px solid #979797; /* medium gray */
  }
`
const NotificationCount = styled.div`
  position: absolute;
  top: 4px;
  right: 12px;
  color: #eeeeee;
  font-size: 10px;
  font-weight: 700;
`

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  background: #fff;
  border: 1px solid #efefef;
  margin-left: 5%;
  width: 90%;

  cursor: pointer;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;

  &:hover {
    background: #efefef;
  }
`

const Dropdown = (props) => {

  const list = props.list
  const [ isListOpen, setIsListOpen ] = useState(false)

  const toggleList = () => {
    isListOpen ? setIsListOpen(false) : setIsListOpen(true) ;
    props.handleReadNotifications()
  }

  return (
    <DropdownWrapper>
      <Header>
        <IconWrapper onClick={toggleList}>
          <FontAwesomeIcon icon={faBell} color="#eeeeee" />
        </IconWrapper>
        {props.showNotificationCount &&
          <NotificationCount>{ props.headerTitle }</NotificationCount>
        }
      </Header>
      {isListOpen && (
        <div role="list" className="dd-list" >
          {list.map((item) => (
            <Button
              type="button"
              className="dd-list-item"
              key={item.id}
            >
              {item.text}
              {' '}
            </Button>
          ))}
        </div>
      )}
    </DropdownWrapper>
  )
}

export default Dropdown
