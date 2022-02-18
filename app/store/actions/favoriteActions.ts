import { FoundMovie } from 'models/reducers/favorite'

import * as types from './types'

export function setFavorites(value: FoundMovie[]) {
  console.log(value)
  return {
    type: types.TOGGLE_FAVORITES,
    favorites: value,
  }
}
