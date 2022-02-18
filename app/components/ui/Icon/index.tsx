import { Image, ImageProps } from 'react-native'
import styled from 'styled-components/native'
import { height, margin, MarginProps, width, WidthProps } from 'styled-system'

type IconProps = ImageProps & WidthProps & MarginProps
export const Icon = styled(Image)<IconProps>`
  resize-mode: contain;
  ${width}
  ${height}
  ${margin}
`
