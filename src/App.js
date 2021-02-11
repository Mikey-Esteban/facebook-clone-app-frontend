import React, { useState } from 'react'
import styled from 'styled-components'
import './App.css'

const Wrapper = styled.div`
  margin: 0 auto;
  width: 400px;

  border: 1px solid #eae7dc; /* light-gray */
`

const Field = styled.div`
  margin-bottom: 20px;
  color: #666666; /* medium gray */
  font-weight: 300;

  label, input {
    margin-left: 5%;
    width: 87%;
  }

  input {
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 5px 0 5px 10px;

    color: #666666; /* medium gray */
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
  }

  input:focus {
    outline: none;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px auto;
`

const Button = styled.button`
  padding: 10px 20px;

  background: #fff;
  border: 1px solid #e98074; /* salmon */
  border-radius: 4px;
  color: #e98074; /* salmon */
  cursor: pointer;
  transition: all ease-in-out 150ms;

  &:hover {
    background: #e98074; /* salmon */
    color: #fff
  }
`

const App = () => {

  const [ user, setUser ] = useState({})

  const handleSubmit = e => {
    e.preventDefault()

    fetch('http://localhost:3000/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "user": user })
    })
      .then(res => {
        if(res.ok) {
          console.log(res.headers.get('Authorization'))
          localStorage.setItem('token', res.headers.get('Authorization'))
          return res.json()
        } else {
          return res.text().then(text => Promise.reject(text));
        }
      })
      .then(json => console.dir(json))
      .catch(err => console.error(err))
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
    console.log(user);
  }

  return (
    <Wrapper>
      <div>[Hello world from App component]</div>
      <form onSubmit={handleSubmit}>

        <Field>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" onChange={handleChange} />
        </Field>

        <Field>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" onChange={handleChange} />
        </Field>

        <ButtonWrapper>
          <Button onClick={handleSubmit}>Log in</Button>
        </ButtonWrapper>
      </form>
    </Wrapper>
  )
}

export default App
