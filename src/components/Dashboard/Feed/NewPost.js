import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from '../Dashboard'

const Wrapper = styled.div`
  display: flex;
  max-width: 600px;
  color: #fff;

  label, textarea {
    width: 100%;
  }

  textarea {
    border: none;
    padding: 10px;

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

const NewPost = () => {

  const currentUser = useContext(UserContext)
  return (
    <Wrapper>
      <form action="">
        <Field>
          <label htmlFor="post">Whats on your mind?</label>
          <textarea name="post" id="" cols="48" rows="10" placeholder={`What's on your mind, ${currentUser.name}?`}></textarea>
        </Field>
      </form>
    </Wrapper>
  )
}

export default NewPost
