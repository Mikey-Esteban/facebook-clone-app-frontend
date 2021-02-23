import Button from './Button'
import styled from 'styled-components'

const DarkBlueButton = styled(Button)`
  background: #eeeeee;
  border: 1px solid #eeeeee; /* dark blue */
  color: #12192f; /* dark blue */

  &:hover {
    background: #12192f; /* dark blue */
    color: #fff;
  }
`

export default DarkBlueButton
