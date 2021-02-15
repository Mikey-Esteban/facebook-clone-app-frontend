import Button from './Button'
import styled from 'styled-components'

const OrangeButton = styled(Button)`
  border: 1px solid #ff8f5f; /* orange */
  color: #ff8f5f; /* orange */

  &:hover {
    background: #ff8f5f; /* orange */
    color: #fff;
  }
`

export default OrangeButton
