import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import { MovieAtFavorites, MovieAtScrollView, PreferencePanel } from 'components/blocks'
import { Column, Icon, Row, ScrollView, Text, TextInput } from 'components/ui'
import { MaybeFoundMovies } from 'models/movie'
import { useDispatch, useSelector } from 'react-redux'
import { Theme } from 'themes'

import { accessPointNetworkOffIcon, accessPointNetworkOffWhiteIcon } from 'assets'

import { API_HOST } from 'config/constants'

import * as preferenceActions from 'store/actions/preferenceActions'
import { FavoriteStateInterface } from 'store/reducers/favoriteReducer'
import { PreferenceReducerStateInterface } from 'store/reducers/preferenceReducer'

const TYPING_DELAY = 300

type Props = {
  onPressToggleFavorite?: (value) => void
  onPressToggleHide?: (value) => void
  onPressMovie?: (value) => void
  isDark: boolean
  favorites: FavoriteStateInterface['favorites']
  theme: Theme
  insideFavorites: (movie) => any
  insideHidden: (movie) => any
}

export function MainScreen({
  onPressToggleFavorite,
  onPressToggleHide,
  onPressMovie,
  isDark,
  favorites,
  theme,
  insideFavorites,
  insideHidden,
}: Props) {
  const [searchAndFilter, setSearchAndFilter] = useState('the lord')
  const [foundMovies, setFoundMovies] = useState<MaybeFoundMovies>()
  const [isConnected, setIsConnected] = useState<boolean | null>()
  const showFavorites = useSelector(
    (state: PreferenceReducerStateInterface) => state.preferenceReducer.displayFavorites,
  )
  const displayHidden = useSelector(
    (state: PreferenceReducerStateInterface) => state.preferenceReducer.displayHidden,
  )
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout>>()
  const dispatch = useDispatch()

  useEffect(() => {
    NetInfo.addEventListener((state: any) => {
      if (isConnected !== state.isConnected) {
        setIsConnected(state.isConnected)
      }
    })
  }, [isConnected])

  const searchData = useCallback(async () => {
    const newIsConnected = (await NetInfo.fetch()).isConnected
    if (!newIsConnected) {
      setIsConnected(newIsConnected)
      return
    }
    setFoundMovies(null)

    let newFoundMovies: MaybeFoundMovies = null
    try {
      const resp = await axios.get(`${API_HOST}/movies?title=${searchAndFilter}`)
      newFoundMovies = resp.data
    } catch (error) {
      console.error(error)
      setIsConnected(false)
      return
    }

    if (newFoundMovies && newFoundMovies.length) {
      setIsConnected(true)
      setFoundMovies(newFoundMovies.slice(0, 100))
    }
  }, [searchAndFilter])

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    const newTimeout: ReturnType<typeof setTimeout> = setTimeout(searchData, TYPING_DELAY)
    setTypingTimeout(newTimeout)
  }, [searchAndFilter, searchData])

  const handleChangeSearch = useCallback(value => setSearchAndFilter(value), [])

  const handleToggleDisplayFavorites = useCallback(() => {
    dispatch(preferenceActions.setDisplayFavorites(!showFavorites))
  }, [showFavorites, dispatch])
  const handleToggleDisplayHidden = useCallback(() => {
    dispatch(preferenceActions.setDisplayHidden(!displayHidden))
  }, [displayHidden, dispatch])

  return (
    <Column bg="screen.mainScreen.column.bg" px={2} py={2} stretch>
      <TextInput
        label="Search"
        mb={2}
        theme={theme}
        underlineColorAndroid="screen.mainScreen.textUnderlineColor.color"
        value={searchAndFilter}
        onChangeText={handleChangeSearch}
      />

      {!isConnected && (
        <Row alignCenter>
          <Icon
            height={50}
            mr={3}
            source={isDark ? accessPointNetworkOffWhiteIcon : accessPointNetworkOffIcon}
            width={50}
          />
          <Text color="screen.mainScreen.disconnectedText.color" fontSize={2}>
            You are disconnected from a network
          </Text>
        </Row>
      )}
      {foundMovies && favorites && showFavorites && (
        <View>
          <Text color="screen.mainScreen.favoritesTitle.color" fontSize={2} mb={2} bold>
            Favorites
          </Text>
          <ScrollView mb={3} horizontal>
            {Object.keys(favorites).map(key => {
              const time = Number(new Date())
              const movie = favorites[key]

              return (
                <MovieAtFavorites
                  key={`${time}_${movie.imdbID}`}
                  movie={movie}
                  onPressMovie={onPressMovie}
                />
              )
            })}
          </ScrollView>
        </View>
      )}
      <PreferencePanel
        displayHidden={displayHidden}
        showFavorites={showFavorites}
        theme={theme}
        onToggleDisplayFavorites={handleToggleDisplayFavorites}
        onToggleDisplayHidden={handleToggleDisplayHidden}
      />

      <ScrollView>
        {foundMovies &&
          foundMovies.map(movie => {
            const time = Number(new Date())

            if (insideHidden(movie) && !displayHidden) {
              return <View key={`${time}_${movie.imdbID}`} />
            }
            return (
              <MovieAtScrollView
                insideFavorites={insideFavorites}
                insideHidden={insideHidden}
                key={`${time}_${movie.imdbID}`}
                movie={movie}
                onPressMovie={onPressMovie}
                onPressToggleFavorite={onPressToggleFavorite}
                onPressToggleHide={onPressToggleHide}
              />
            )
          })}
      </ScrollView>
    </Column>
  )
}
