import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled, { css } from 'styled-components/native'
import { margin, MarginProps, styleFn } from 'styled-system'

type RowProps = MarginProps & {
  justifyEnd?: boolean
  alignCenter?: boolean
}
const justifyEndCss: styleFn = ({ justifyEnd }: RowProps) =>
  justifyEnd &&
  css`
    justify-content: flex-end;
  `
const alignCenterCss: styleFn = ({ alignCenter }: RowProps) =>
  alignCenter &&
  css`
    align-items: center;
  `

export const Row = styled(View)<RowProps>`
  flex-direction: row;

  ${margin}
  ${justifyEndCss}
  ${alignCenterCss}
`

type StyledIconProps = MarginProps

export const StyledIcon = styled(Icon)<StyledIconProps>`
  ${margin}
`
