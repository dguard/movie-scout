import { ScrollView as ScrollViewInternal } from 'react-native'
import styled from 'styled-components/native'
import { layout, LayoutProps, margin, MarginProps } from 'styled-system'

type ScrollViewProps = LayoutProps & MarginProps
export const ScrollView = styled(ScrollViewInternal)<ScrollViewProps>`
  ${layout}
  ${margin}
`
