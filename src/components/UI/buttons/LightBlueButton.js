import Button from './Button'
import styled from 'styled-components'

const LightBlueButton = styled(Button)`
  border: 1px solid #0088cc; /* light blue */
  color: #0088cc; /* light blue */

  &:hover {
    background: #0088cc; /* light blue */
    color: #fff;
  }
`

export default LightBlueButton
