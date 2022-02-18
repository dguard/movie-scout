import { ScrollView as ScrollViewInternal } from 'react-native'
import styled from 'styled-components/native'
import { layout, LayoutProps } from 'styled-system'

type ScrollViewProps = LayoutProps
export const ScrollView = styled(ScrollViewInternal)<ScrollViewProps>`
  ${layout}
`
