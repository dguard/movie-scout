import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native'
import { DarkTheme as PaperDarkTheme } from 'react-native-paper'
import colors from 'themes/dark/colors'
import palette from 'themes/main/palette'

const theme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: palette.grayUmber,
    card: palette.lightGray,
    text: '#f5f5f5',
    accent: '#ffffff',
    primary: 'gray',
    placeholder: '#f5f5f5',
    ...colors,
  },
}
export default theme
