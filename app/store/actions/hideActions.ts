import { FoundMovie } from 'models/movie'

import * as types from './types'

export interface HideToggleActionInterface {
  hidden: { [id: string]: FoundMovie }
}

export function setHidden(value: FoundMovie[]) {
  return {
    type: types.TOGGLE_HIDDEN,
    hidden: value,
  }
}
