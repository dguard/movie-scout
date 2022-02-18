import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'
import {
  borderRadius,
  BorderRadiusProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  styleFn,
} from 'styled-system'

type ButtonProps = ColorProps &
  LayoutProps &
  PaddingProps &
  MarginProps &
  BorderRadiusProps & {
    borderTop?: boolean
    row?: boolean
    stretch?: boolean
    justifyCenter?: boolean
    alignCenter?: boolean
  }

const rowCss: styleFn = ({ row }: ButtonProps) =>
  row &&
  css`
    flex-direction: row;
  `

const stretchCss: styleFn = ({ stretch }: ButtonProps) =>
  stretch &&
  css`
    flex: 1;
  `

const justifyCenterCss: styleFn = ({ justifyCenter }: ButtonProps) =>
  justifyCenter &&
  css`
    justify-content: center;
  `
const alignCenterCss: styleFn = ({ alignCenter }: ButtonProps) =>
  alignCenter &&
  css`
    align-items: center;
  `

export const Button = styled(TouchableOpacity)<ButtonProps>`
  ${color}
  ${layout}
  ${margin}
  ${padding}
  ${borderRadius}

  ${rowCss}
  ${stretchCss}

  ${justifyCenterCss}
  ${alignCenterCss}
`
