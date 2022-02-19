import * as React from 'react'
import { useCallback } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeController } from 'components/blocks'
import { FoundMovie } from 'models/movie'
import { DarkTheme, DefaultTheme, ThemeProvider as ThemeProviderPaper } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components/native'

import { useTheme } from 'services/theme'

import * as favoriteActions from 'store/actions/favoriteActions'
import * as hiddenActions from 'store/actions/hideActions'
import { FavoriteReducerStateInterface } from 'store/reducers/favoriteReducer'
import { HideReducerStateInterface } from 'store/reducers/hideReducer'
import { ThemeReducerStateInterface } from 'store/reducers/themeReducer'

import { MainScreen } from 'screens/main/screen'
import { MovieScreen } from 'screens/movie/screen'

const Stack = createStackNavigator()

export function App() {
  const { theme } = useTheme()

  const isDark = useSelector((state: ThemeReducerStateInterface) => state.themeReducer.isDark)
  const favorites = useSelector(
    (state: FavoriteReducerStateInterface) => state.favoriteReducer.favorites,
  )
  const hidden = useSelector((state: HideReducerStateInterface) => state.hideReducer.hidden)
  const dispatch = useDispatch()
  const navigationRef = React.createRef<NavigationContainerRef>()

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
  const insideFavorites = useCallback((movie: FoundMovie) => favorites[movie.imdbID], [favorites])
  const insideHidden = useCallback((movie: FoundMovie) => hidden[movie.imdbID], [hidden])

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
                  insideFavorites={insideFavorites}
                  insideHidden={insideHidden}
                  isDark={isDark}
                  theme={theme as any}
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
                  insideFavorites={insideFavorites}
                  insideHidden={insideHidden}
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
