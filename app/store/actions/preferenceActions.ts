import * as types from './types'

export interface PreferenceToggleDisplayFavoritesInterface {
  displayFavorites: boolean
}

export function setDisplayFavorites(value: boolean) {
  return {
    type: types.TOGGLE_DISPLAY_FAVORITES,
    displayFavorites: value,
  }
}

export interface PreferenceToggleDisplayHiddenInterface {
  displayHidden: boolean
}

export function setDisplayHidden(value: boolean) {
  return {
    type: types.TOGGLE_DISPLAY_HIDDEN,
    displayHidden: value,
  }
}
