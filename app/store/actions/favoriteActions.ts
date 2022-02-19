import { FoundMovie } from 'models/movie'

import * as types from './types'

export interface FavoriteToggleActionInterface {
  favorites: { [id: string]: FoundMovie }
}

export function setFavorites(value: FoundMovie[]) {
  return {
    type: types.TOGGLE_FAVORITES,
    favorites: value,
  }
}
