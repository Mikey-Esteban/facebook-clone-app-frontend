import Button from './Button'
import styled from 'styled-components'

const GrayButton = styled(Button)`
  border: 1px solid #666666; /* dark gray */
  color: #666666; /* dark gray */

  &:hover {
    background: #666666; /* dark gray */
    color: #fff;
  }
`

export default GrayButton
