/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import { createReducer } from 'lib/createReducer'
import { FoundMovie } from 'models/movie'

import { FavoriteToggleActionInterface } from 'store/actions/favoriteActions'
import * as types from 'store/actions/types'

export interface FavoriteStateInterface {
  favorites: { [id: string]: FoundMovie }
}

export interface FavoriteReducerStateInterface {
  favoriteReducer: FavoriteStateInterface
}

const initialState: FavoriteStateInterface = {
  favorites: {},
}

export const favoriteReducer = createReducer(initialState, {
  [types.TOGGLE_FAVORITES](state: FavoriteStateInterface, action: FavoriteToggleActionInterface) {
    return { ...state, favorites: action.favorites }
  },
})
