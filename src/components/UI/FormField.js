import styled from 'styled-components'

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
export default Field
