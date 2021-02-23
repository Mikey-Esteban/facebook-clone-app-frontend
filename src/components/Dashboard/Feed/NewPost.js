import React from 'react'
import styled from 'styled-components'
import LightBlueButton from '../../UI/buttons/LightBlueButton'

const Wrapper = styled.div`
  display: flex;
  max-width: 600px;

  border: 1px solid #efefef;
  color: #fff;

  label, textarea {
    width: 100%;
  }

  textarea {
    border: none;
    padding: 10px;
    width: 580px;

    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    line-height: 1.5em;
  }

  textarea:focus {
    outline:none;
  }
`

const Field = styled.div`

`

const NewPost = (props) => {

  return (
    <Wrapper>
      <form onSubmit={props.handleSubmit}>
        <Field>
          <textarea name="text" cols="48" rows="10"
            placeholder={`What's on your mind, ${props.currentUser.name}?`}
            onChange={props.handleChange}
            value={props.post.text || ''}
          />
          <LightBlueButton onClick={props.handleSubmit}>Submit</LightBlueButton>
        </Field>
      </form>
    </Wrapper>
  )
}

export default NewPost
