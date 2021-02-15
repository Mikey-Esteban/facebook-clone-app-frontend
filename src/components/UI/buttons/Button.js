import styled from 'styled-components'

const Button = styled.button`
  padding: 10px 20px;

  background: #fff;
  border: 1px solid #d0102b; /* red */
  border-radius: 4px;
  color: #d0102b; /* red */
  cursor: pointer;
  outlie: none;
  transition: all ease-in-out 150ms;

  &:hover {
    background: #d0102b; /* red */
    color: #fff
  }

  &:focus {
    outline: none;
  }
`

export default Button
