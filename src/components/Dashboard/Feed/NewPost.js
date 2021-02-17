import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import axiosApiInstance from '../../interceptor'
import { UserContext } from '../Dashboard'
import LightBlueButton from '../../UI/buttons/LightBlueButton'

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
  const [ post, setPost ] = useState({user_id: currentUser.id})

  const handleSubmit = e => {
    e.preventDefault()

    axiosApiInstance.post('http://localhost:3000/api/v1/posts', { post: post })
      .then( resp => {
        // reset post
        setPost({user_id: currentUser.id})
      })
      .catch( resp => console.log(resp))
  }

  const handleChange = e => {
    setPost({...post, [e.target.name]:e.target.value})
    console.log(post);
  }


  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Field>
          <label htmlFor="text">Whats on your mind?</label>
          <textarea name="text" cols="48" rows="10"
            placeholder={`What's on your mind, ${currentUser.name}?`}
            onChange={handleChange}
          />
          <LightBlueButton onClick={handleSubmit}>Submit</LightBlueButton>
        </Field>
      </form>
    </Wrapper>
  )
}

export default NewPost
