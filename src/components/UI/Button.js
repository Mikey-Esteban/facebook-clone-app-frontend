import styled from 'styled-components'

const Button = styled.button`
  padding: 10px 20px;

  background: #fff;
  border: 1px solid #e98074; /* salmon */
  border-radius: 4px;
  color: #e98074; /* salmon */
  cursor: pointer;
  outlie: none;
  transition: all ease-in-out 150ms;

  &:hover {
    background: #e98074; /* salmon */
    color: #fff
  }
  
  &:focus {
    outline: none;
  }
`

export default Button
