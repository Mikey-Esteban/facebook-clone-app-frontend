import React from 'react'
import styled from 'styled-components'
import LightBlueButton from '../../UI/buttons/LightBlueButton'

const Wrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
  }

  input {
    background: #979797; /* dark gray */
    border: none;
    border-radius: 10px;
    color: #fff;
    margin: 3px;
    padding: 10px;
    font-size: 12px;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: #fff;
    font-style: italic;
  }
`

const NewComment = (props) => {

  return (
    <Wrapper>
      <form onSubmit={props.handleSubmit}>
        <input type="text" name="text" value={props.comment.text || ''}
          onChange={props.handleChange} placeholder=" Leave a comment..."/>
        <LightBlueButton onClick={props.handleSubmit}>submit</LightBlueButton>
      </form>
    </Wrapper>
  )
}

export default NewComment
