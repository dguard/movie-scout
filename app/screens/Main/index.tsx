import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import { IState } from 'components/blocks/ThemeController'
import { Button, Column, Icon, Image, Row, ScrollView, Text, TextInput } from 'components/ui'
import { FoundMovie, IFavoriteState } from 'models/reducers/favorite'
import { IHideState } from 'models/reducers/hide'
import { Checkbox } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import {
  accessPointNetworkOffIcon,
  accessPointNetworkOffWhiteIcon,
  eyeSlashBlueIcon,
  eyeSlashWhiteIcon,
  favoriteBorderWhiteIcon,
  favoriteIcon,
  starIcon,
} from 'assets'

import * as favoriteActions from 'store/actions/favoriteActions'
import * as hiddenActions from 'store/actions/hideActions'

const dimensions = Dimensions.get('window')
console.log('dimensions', dimensions)

interface IFavoriteReducerState {
  favoriteReducer: IFavoriteState
}

interface IHideReducerState {
  hideReducer: IHideState
}

function MainScreen() {
  const [searchAndFilter, setSearchAndFilter] = useState('the lord')
  const [foundMovies, setFoundMovies] = useState<FoundMovie[] | null>()
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [updatedTime, setUpdatedTime] = useState<number | undefined>(undefined)
  const isDark = useSelector((state: IState) => state.themeReducer.isDark)
  const favorites = useSelector((state: IFavoriteReducerState) => state.favoriteReducer.favorites)
  const hidden = useSelector((state: IHideReducerState) => state.hideReducer.hidden)
  const [displayHidden, setDisplayHidden] = useState<boolean>(false)
  const [showFavorites, setShowFavorites] = useState<boolean>(true)

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      console.log('state.isConnected', state.isConnected)
      if (isConnected !== state.isConnected) {
        setIsConnected(state.isConnected)
      }
    })
  }, [])

  useEffect(() => {
    const searchData = async () => {
      const newIsConnected = (await NetInfo.fetch()).isConnected
      if (!newIsConnected) {
        setIsConnected(newIsConnected)
        return
      }
      setFoundMovies(undefined)

      let resp: FoundMovie[] | null = null
      try {
        resp = (
          await axios.get(
            `http://ec2-3-129-72-17.us-east-2.compute.amazonaws.com:8888/movies?title=${searchAndFilter}`,
          )
        ).data
      } catch (error) {
        console.error(error)
        setIsConnected(false)
        return
      }

      if (resp && resp.length) {
        setUpdatedTime(Number(new Date()))
        setFoundMovies(resp.slice(0, 100))
      }
    }

    searchData()
  }, [searchAndFilter])

  const handleChangeSearch = useCallback(value => setSearchAndFilter(value), [])

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
    <Column bg={isDark ? '#000000' : '#fff'} px={2} py={2} stretch>
      <TextInput label="Search" mb={2} value={searchAndFilter} onChangeText={handleChangeSearch} />

      {!isConnected && (
        <Row alignCenter>
          <Icon
            height={50}
            mr={3}
            source={isDark ? accessPointNetworkOffWhiteIcon : accessPointNetworkOffIcon}
            width={50}
          />
          <Text color={isDark ? '#fff' : '#000'} fontSize={2}>
            You are disconnected from a network
          </Text>
        </Row>
      )}
      {foundMovies && favorites && showFavorites && (
        <View>
          <Text color={isDark ? '#fff' : '#000'} fontSize={2} mb={2} bold>
            Favorites
          </Text>
          <ScrollView style={{ marginBottom: 8 }} horizontal>
            {Object.keys(favorites).map(key => {
              const movie: FoundMovie = favorites[key]

              return (
                <Column
                  bg={isDark ? '#1a1a1a' : '#dedede'}
                  height={250}
                  key={`${updatedTime}_${movie.imdbID}`}
                  mr={3}
                  width={105}>
                  <Image height={150} mr={3} source={{ uri: movie.Poster }} width={105} />
                  <Column px={2} py={2} stretch>
                    <Row mb={2} alignCenter>
                      <Icon height={15} mr={1} source={starIcon} width={15} />
                      <Text color={isDark ? '#fff' : '#000'} wrap>
                        {movie.imdbRating}
                      </Text>
                    </Row>
                    <Text color={isDark ? '#fff' : '#000'} wrap>
                      {movie.Title}
                    </Text>
                  </Column>
                </Column>
              )
            })}
          </ScrollView>
        </View>
      )}
      <Row>
        <Button
          borderRadius={10}
          height={50}
          width={200}
          alignCenter
          row
          onPress={() => setShowFavorites(!showFavorites)}>
          <Checkbox status={showFavorites ? 'checked' : 'unchecked'} onPress={() => {}} />
          <Text color={isDark ? '#fff' : '#000'}>Favorites</Text>
        </Button>
        <Button
          borderRadius={10}
          height={50}
          width={200}
          alignCenter
          row
          onPress={() => setDisplayHidden(!displayHidden)}>
          <Checkbox status={displayHidden ? 'checked' : 'unchecked'} onPress={() => {}} />
          <Text color={isDark ? '#fff' : '#000'}>Hidden</Text>
        </Button>
      </Row>
      <ScrollView>
        {foundMovies &&
          foundMovies.map(movie => {
            if (insideHidden(movie) && displayHidden === false) {
              return <View />
            }
            return (
              <Row
                bg={isDark ? '#1a1a1a' : '#dedede'}
                key={`${updatedTime}_${movie.imdbID}`}
                mb={10}>
                <Image height={200} mr={3} source={{ uri: movie.Poster }} width={140} />
                <Column px={2} py={2} stretch>
                  <Row mb={2} alignCenter>
                    <Icon height={30} mr={1} source={starIcon} width={30} />
                    <Text color={isDark ? '#fff' : '#000'} wrap>
                      {movie.imdbRating}
                    </Text>
                  </Row>
                  <Text color={isDark ? '#fff' : '#000'} wrap>
                    {movie.Title}
                  </Text>
                  <Row>
                    <Button
                      bg="#2c2c2c"
                      borderRadius={10}
                      height={50}
                      width={75}
                      alignCenter
                      justifyCenter
                      onPress={() => handlePressToggleFavorite(movie)}>
                      {(insideFavorites(movie) && (
                        <Icon height={30} source={favoriteIcon} width={30} />
                      )) || <Icon height={30} source={favoriteBorderWhiteIcon} width={30} />}
                    </Button>
                    <Button
                      borderRadius={10}
                      height={50}
                      width={75}
                      alignCenter
                      justifyCenter
                      onPress={() => handlePressToggleHide(movie)}>
                      {(insideHidden(movie) && (
                        <Icon height={30} source={eyeSlashBlueIcon} width={30} />
                      )) || <Icon height={30} source={eyeSlashWhiteIcon} width={30} />}
                    </Button>
                  </Row>
                </Column>
              </Row>
            )
          })}
      </ScrollView>
    </Column>
  )
}

export default MainScreen
