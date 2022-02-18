import { Image as ImageInternal } from 'react-native'
import styled from 'styled-components/native'
import { layout, LayoutProps, margin, MarginProps } from 'styled-system'

type ImageProps = LayoutProps & MarginProps
export const Image = styled(ImageInternal).attrs({
  resizeMode: 'contain',
})<ImageProps>`
  ${layout}
  ${margin}
`
