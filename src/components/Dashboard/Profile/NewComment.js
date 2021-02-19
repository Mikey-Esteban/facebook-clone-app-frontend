import React, { useState, useContext } from 'react'
import { UserContext } from '../Dashboard'
import axiosApiInstance from '../../interceptor'
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

  const { currentUser } = useContext(UserContext)
  const { post_id } = props
  const [ comment, setComment ] = useState(
    {commenter: currentUser.name, user_id: currentUser.id, post_id: post_id}
  )

  const handleChange = e => {
    setComment({...comment, [e.target.name]:e.target.value})
    console.log(comment);
  }

  const handleSubmit = e => {
    e.preventDefault()

    axiosApiInstance.post(`http://localhost:3000/api/v1/posts/${post_id}/comments`, { comment: comment })
      .then( resp => {
        // reset comment
        setComment({commenter: currentUser.name, user_id: currentUser.id, post_id: post_id})
      })
      .catch( resp => console.log(resp))
  }


  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" onChange={handleChange} placeholder=" Leave a comment..."/>
        <LightBlueButton>submit</LightBlueButton>
      </form>
    </Wrapper>
  )
}

export default NewComment
