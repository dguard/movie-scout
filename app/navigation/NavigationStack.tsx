import * as React from 'react'
import { useCallback } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ThemeController from 'components/blocks/ThemeController'
import { FoundMovie } from 'models/movie'
import { IFavoriteReducerState, IHideReducerState, IThemeReducerState } from 'models/reducers'
import { DarkTheme, DefaultTheme, ThemeProvider as ThemeProviderPaper } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components/native'

import { useTheme } from 'services/store/theme'

import * as favoriteActions from 'store/actions/favoriteActions'
import * as hiddenActions from 'store/actions/hideActions'

import MainScreen from 'screens/Main'
import MovieScreen from 'screens/Movie'

import { navigationRef } from './NavigationService'

const Stack = createStackNavigator()

function App() {
  const { theme } = useTheme()

  const isDark = useSelector((state: IThemeReducerState) => state.themeReducer.isDark)
  const favorites = useSelector((state: IFavoriteReducerState) => state.favoriteReducer.favorites)
  const hidden = useSelector((state: IHideReducerState) => state.hideReducer.hidden)
  const dispatch = useDispatch()

  const handlePressMovie = useCallback(
    movie => {
      navigationRef.current?.navigate('Movie', {
        movie,
      })
    },
    [navigationRef],
  )
  const handlePressToggleFavorite = useCallback(
    (movie: FoundMovie) => {
      const newFavorites = JSON.parse(JSON.stringify(favorites))
      if (newFavorites[movie.imdbID]) {
        delete newFavorites[movie.imdbID]
      } else {
        newFavorites[movie.imdbID] = movie
      }
      dispatch(favoriteActions.setFavorites(newFavorites))
    },
    [dispatch, favorites],
  )
  const handlePressToggleHide = useCallback(
    (movie: FoundMovie) => {
      const newHidden = JSON.parse(JSON.stringify(hidden))
      if (newHidden[movie.imdbID]) {
        delete newHidden[movie.imdbID]
      } else {
        newHidden[movie.imdbID] = movie
      }
      dispatch(hiddenActions.setHidden(newHidden))
    },
    [dispatch, hidden],
  )

  return (
    <ThemeProviderPaper theme={theme.dark ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={theme}>
        <NavigationContainer ref={navigationRef} theme={theme}>
          <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              options={{
                headerRight: () => <ThemeController />,
              }}>
              {props => (
                <MainScreen
                  {...props}
                  favorites={favorites}
                  hidden={hidden}
                  isDark={isDark}
                  theme={theme}
                  onPressMovie={handlePressMovie}
                  onPressToggleFavorite={handlePressToggleFavorite}
                  onPressToggleHide={handlePressToggleHide}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Movie"
              options={{
                headerRight: () => <ThemeController />,
              }}>
              {props => (
                <MovieScreen
                  {...props}
                  favorites={favorites}
                  hidden={hidden}
                  isDark={isDark}
                  onPressToggleFavorite={handlePressToggleFavorite}
                  onPressToggleHide={handlePressToggleHide}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </ThemeProviderPaper>
  )
}

export default App
