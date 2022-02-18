import { TextInput as TextInputInternal } from 'react-native-paper'
import styled from 'styled-components/native'
import {
  border,
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
} from 'styled-system'

type TextControlProps = BorderProps & BorderRadiusProps & PaddingProps & MarginProps

export const TextInput = styled(TextInputInternal)<TextControlProps>`
  ${border}
  ${borderRadius}
  ${padding}
  ${margin}
`
