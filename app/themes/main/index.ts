import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper'
import { colors } from 'themes/main/colors'
import { palette } from 'themes/main/palette'

export const theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#fff',
    card: palette.grayUmber,
    backdrop: 'transparent',
    text: palette.grayUmberLight,
    accent: palette.grayUmber,
    primary: 'gray',
    placeholder: palette.grayUmber,
    ...colors,
  },
}
