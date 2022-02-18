/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import createReducer from 'lib/createReducer'
import { IFavoriteToggleAction } from 'models/actions/favorite'
import { IFavoriteState } from 'models/reducers/favorite'

import * as types from 'store/actions/types'

const initialState: IFavoriteState = {
  favorites: {},
}

export const favoriteReducer = createReducer(initialState, {
  [types.TOGGLE_FAVORITES](state: IFavoriteState, action: IFavoriteToggleAction) {
    return { ...state, favorites: action.favorites }
  },
})
