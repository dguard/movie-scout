/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import { createReducer } from 'lib/createReducer'

import {
  PreferenceToggleDisplayFavoritesInterface,
  PreferenceToggleDisplayHiddenInterface,
} from 'store/actions/preferenceActions'
import * as types from 'store/actions/types'

export interface PreferenceStateInterface {
  displayFavorites: boolean
  displayHidden: boolean
}

export interface PreferenceReducerStateInterface {
  preferenceReducer: PreferenceStateInterface
}

const initialState: PreferenceStateInterface = {
  displayFavorites: true,
  displayHidden: false,
}

export const preferenceReducer = createReducer(initialState, {
  [types.TOGGLE_DISPLAY_FAVORITES](
    state: PreferenceStateInterface,
    action: PreferenceToggleDisplayFavoritesInterface,
  ) {
    return { ...state, displayFavorites: action.displayFavorites }
  },
  [types.TOGGLE_DISPLAY_HIDDEN](
    state: PreferenceStateInterface,
    action: PreferenceToggleDisplayHiddenInterface,
  ) {
    return { ...state, displayHidden: action.displayHidden }
  },
})
