import React from 'react'
import { Switch } from 'react-native'
import { IThemeReducerState } from 'models/reducers/theme'
import { useDispatch, useSelector } from 'react-redux'

import * as themeActions from 'store/actions/themeActions'

import { Row, StyledIcon } from './styles'

function ThemeController() {
  const isDark = useSelector((state: IThemeReducerState) => state.themeReducer.isDark)

  const dispatch = useDispatch()
  const handleToggleTheme = () => dispatch(themeActions.setIsDarkTheme(!isDark) as any)
  const iconName = isDark ? 'weather-night' : 'white-balance-sunny'

  return (
    <Row mx={12} my={12} alignCenter justifyEnd>
      <Switch value={isDark} onValueChange={handleToggleTheme} />
      <StyledIcon color="white" ml={1} name={iconName} size={20} />
    </Row>
  )
}

export default ThemeController
