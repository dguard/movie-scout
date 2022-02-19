/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import { createReducer } from 'lib/createReducer'

import { IThemeToggleAction } from 'store/actions/themeActions'
import * as types from 'store/actions/types'

export interface ThemeStateInterface {
  isDark: boolean
}

export interface ThemeReducerStateInterface {
  themeReducer: ThemeStateInterface
}

const initialState: ThemeStateInterface = {
  isDark: false,
}

export const themeReducer = createReducer(initialState, {
  [types.TOGGLE_THEME](state: ThemeStateInterface, action: IThemeToggleAction) {
    return { ...state, isDark: action.isDark }
  },
})
