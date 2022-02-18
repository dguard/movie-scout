import { Text as TextInternal } from 'react-native'
import styled, { css } from 'styled-components/native'
import {
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  FontWeightProps,
  layout,
  LayoutProps,
  lineHeight,
  LineHeightProps,
  margin,
  MarginProps,
  styleFn,
  TextAlignProps,
} from 'styled-system'

type TextProps = ColorProps &
  FontWeightProps &
  TextAlignProps &
  FontSizeProps &
  LineHeightProps &
  LayoutProps &
  MarginProps & {
    bold?: boolean
    alignCenter?: boolean
    fullWidth?: boolean
    wrap?: boolean
  }

const boldCss: styleFn = ({ bold }: TextProps) =>
  bold &&
  css`
    font-weight: bold;
  `

const alignCenterCss: styleFn = ({ alignCenter }: TextProps) =>
  alignCenter &&
  css`
    text-align: center;
  `
const fullWidthCss: styleFn = ({ fullWidth }: TextProps) =>
  fullWidth &&
  css`
    width: 100%;
  `

const wrapCss: styleFn = ({ wrap }: TextProps) =>
  wrap &&
  css`
    flex-wrap: wrap;
    flex: 1;
  `

export const Text = styled(TextInternal)<TextProps>`
  ${color}
  ${fontSize}
  ${lineHeight}
  ${layout}
  ${margin}

  ${boldCss}
  ${alignCenterCss}
  ${fullWidthCss}
  ${wrapCss}
`
