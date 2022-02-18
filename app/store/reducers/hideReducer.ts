/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import createReducer from 'lib/createReducer'
import { IHideToggleAction } from 'models/actions/hide'
import { IHideState } from 'models/reducers/hide'

import * as types from 'store/actions/types'

const initialState: IHideState = {
  hidden: {},
}

export const hideReducer = createReducer(initialState, {
  [types.TOGGLE_HIDDEN](state: IHideState, action: IHideToggleAction) {
    return { ...state, hidden: action.hidden }
  },
})
