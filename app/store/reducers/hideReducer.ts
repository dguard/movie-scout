/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import { createReducer } from 'lib/createReducer'
import { FoundMovie } from 'models/movie'

import { HideToggleActionInterface } from 'store/actions/hideActions'
import * as types from 'store/actions/types'

export interface HideStateInterface {
  hidden: { [id: string]: FoundMovie }
}

export interface HideReducerStateInterface {
  hideReducer: HideStateInterface
}

const initialState: HideStateInterface = {
  hidden: {},
}

export const hideReducer = createReducer(initialState, {
  [types.TOGGLE_HIDDEN](state: HideStateInterface, action: HideToggleActionInterface) {
    return { ...state, hidden: action.hidden }
  },
})
