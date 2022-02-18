import { View } from 'react-native'
import styled, { css } from 'styled-components/native'
import {
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

type ElementProps = MarginProps &
  PaddingProps &
  LayoutProps &
  ColorProps & {
    justifyCenter?: boolean
    alignCenter?: boolean
    stretch?: boolean
  }
const justifyCenterCss: styleFn = ({ justifyCenter }: ElementProps) =>
  justifyCenter &&
  css`
    justify-content: center;
  `
const alignCenterCss: styleFn = ({ alignCenter }: ElementProps) =>
  alignCenter &&
  css`
    align-items: center;
  `

const stretchCss: styleFn = ({ stretch }: ElementProps) =>
  stretch &&
  css`
    flex: 1;
  `

const Element = styled(View)`
  ${padding}
  ${margin}
  ${layout}
  ${color}
  ${justifyCenterCss}
  ${alignCenterCss}
  ${stretchCss}
`

export const Row = styled(Element)<ElementProps>`
  flex-direction: row;
`

export const Column = styled(Element)<ElementProps>`
  flex-direction: column;
`
