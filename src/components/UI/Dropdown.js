import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-around;
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

const TitleWrapper = styled.div`
  color: #1d3557; /* dark blue */
`

const IconWrapper = styled.div`
  margin-right: 20px;
  cursor: pointer;
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
        { props.headerTitle }
        <IconWrapper onClick={toggleList}>
          <FontAwesomeIcon icon={faBell} color="#8d99ae" />
        </IconWrapper>
      </Header>
      {isListOpen && (
        <div role="list" className="dd-list" >
          {list.map((item) => (
            <Button
              type="button"
              className="dd-list-item"
              key={item.id}
            >
              <TitleWrapper>{item.text}</TitleWrapper>
              {' '}
            </Button>
          ))}
        </div>
      )}
    </DropdownWrapper>
  )
}

export default Dropdown
