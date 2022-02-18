import { FoundMovie } from 'models/reducers/favorite'

import * as types from './types'

export function setHidden(value: FoundMovie[]) {
  return {
    type: types.TOGGLE_HIDDEN,
    hidden: value,
  }
}
