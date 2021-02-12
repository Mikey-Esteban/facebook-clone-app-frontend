import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'

const DropdownWrapper = styled.div`
  width: 100px;
`

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  background: #fff;
  border: 1px solid #efefef;
  width: 80%;

  cursor: pointer;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;

  &:hover {
    background: #efefef;
  }
`

const TitleWrapper = styled.div`
  color: #1d3557; /* dark blue */
  ${'' /* margin-left: 20px; */}
`

const IconWrapper = styled.div`
  margin-right: 20px;
`

const Dropdown = (props) => {

  const list = props.list
  const [ isListOpen, setIsListOpen ] = useState(false)

  const toggleList = () => {
    isListOpen ? setIsListOpen(false) : setIsListOpen(true) ;
  }

  return (
    <DropdownWrapper>
      {/* <Button
        type="button"
        className="dd-header"
        onClick={toggleList}
      > */}
        <IconWrapper onClick={toggleList}>
          {isListOpen
            ? <FontAwesomeIcon icon={faUserFriends} color="#8d99ae" />
            : <FontAwesomeIcon icon={faUserFriends} color="#8d99ae" />}
        </IconWrapper>
      {/* </Button> */}
      {isListOpen && (
        <div
          role="list"
          className="dd-list"
        >
          {list.map((item) => (
            <Button
              type="button"
              className="dd-list-item"
              key={item.id}
            >
              <TitleWrapper>{item.title}</TitleWrapper>
              {' '}
            </Button>
          ))}
        </div>
      )}
    </DropdownWrapper>
  )
}

export default Dropdown
