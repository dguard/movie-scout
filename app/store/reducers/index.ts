import { preferenceReducer } from 'store/reducers/preferenceReducer'

import { favoriteReducer } from './favoriteReducer'
import { hideReducer } from './hideReducer'
import { themeReducer } from './themeReducer'

export const rootReducers = { themeReducer, favoriteReducer, hideReducer, preferenceReducer }
