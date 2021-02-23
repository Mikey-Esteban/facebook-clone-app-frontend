import React from 'react'
import styled from 'styled-components'
import Button from './UI/buttons/Button'
import Field from './UI/FormField'

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px auto;
`

const Login = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>

      <Field>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" onChange={props.handleChange} />
      </Field>

      <Field>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={props.handleChange} />
      </Field>

      <ButtonWrapper>
        <Button onClick={props.handleSubmit}>Log in</Button>
      </ButtonWrapper>
    </form>
  )
}

export default Login
