import * as types from './types'

export interface IThemeToggleAction {
  isDark: boolean
}

export function setIsDarkTheme(value: boolean) {
  return {
    type: types.TOGGLE_THEME,
    isDark: value,
  }
}
