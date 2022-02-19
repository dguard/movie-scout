import { useSelector } from 'react-redux'
import { themes } from 'themes'

import { ThemeReducerStateInterface } from 'store/reducers/themeReducer'

export function useTheme() {
  const isDark = useSelector((state: ThemeReducerStateInterface) => state.themeReducer.isDark)
  const theme = isDark ? themes.dark : themes.main

  return { theme }
}
