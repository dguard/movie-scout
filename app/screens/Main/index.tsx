import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import { Button, Column, Icon, Image, Row, ScrollView, Text, TextInput } from 'components/ui'
import { FoundMovie } from 'models/movie'
import { IFavoriteState, IHideState } from 'models/reducers'
import { Checkbox } from 'react-native-paper'

import {
  accessPointNetworkOffIcon,
  accessPointNetworkOffWhiteIcon,
  eyeSlashBlueIcon,
  eyeSlashWhiteIcon,
  favoriteBorderWhiteIcon,
  favoriteIcon,
  starIcon,
} from 'assets'

import { API_HOST } from 'config/constants'

type Props = {
  onPressToggleFavorite?: (value) => void
  onPressToggleHide?: (value) => void
  onPressMovie?: (value) => void
  isDark: boolean
  favorites: IFavoriteState['favorites']
  hidden: IHideState['hidden']
  theme: any
}

const TYPING_DELAY = 300

function MainScreen({
  onPressToggleFavorite,
  onPressToggleHide,
  onPressMovie,
  isDark,
  favorites,
  hidden,
  theme,
}: Props) {
  const [searchAndFilter, setSearchAndFilter] = useState('the lord')
  const [foundMovies, setFoundMovies] = useState<FoundMovie[] | null>(null)
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [displayHidden, setDisplayHidden] = useState<boolean>(false)
  const [showFavorites, setShowFavorites] = useState<boolean>(true)
  const [typingTimeout, setTypingTimeout] = useState<any>(undefined)

  useEffect(() => {
    NetInfo.addEventListener((state: any) => {
      if (isConnected !== state.isConnected) {
        setIsConnected(state.isConnected)
      }
    })
  }, [isConnected])

  useEffect(() => {
    const searchData = async () => {
      const newIsConnected = (await NetInfo.fetch()).isConnected
      if (!newIsConnected) {
        setIsConnected(newIsConnected)
        return
      }
      setFoundMovies(null)

      let resp: FoundMovie[] | null = null
      try {
        resp = (await axios.get(`${API_HOST}/movies?title=${searchAndFilter}`)).data
      } catch (error) {
        console.error(error)
        setIsConnected(false)
        return
      }

      if (resp && resp.length) {
        setIsConnected(true)
        setFoundMovies(resp.slice(0, 100))
      }
    }

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    const newTimeout: any = setTimeout(() => {
      searchData()
    }, TYPING_DELAY)
    setTypingTimeout(newTimeout)
  }, [searchAndFilter])

  const handleChangeSearch = useCallback(value => setSearchAndFilter(value), [])

  const insideFavorites = useCallback((movie: FoundMovie) => favorites[movie.imdbID], [favorites])
  const insideHidden = useCallback((movie: FoundMovie) => hidden[movie.imdbID], [hidden])

  return (
    <Column bg={isDark ? '#000000' : '#fff'} px={2} py={2} stretch>
      <TextInput
        label="Search"
        mb={2}
        theme={theme}
        underlineColorAndroid="#f5f5f5"
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
          <ScrollView mb={3} horizontal>
            {Object.keys(favorites).map(key => {
              const movie: FoundMovie = favorites[key]
              const time = Number(new Date())

              return (
                <Button key={`${time}_${movie.imdbID}`} onPress={() => onPressMovie?.(movie)}>
                  <Column
                    bg={isDark ? '#1a1a1a' : '#dedede'}
                    height={250}
                    key={`${time}_${movie.imdbID}`}
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
                </Button>
              )
            })}
          </ScrollView>
        </View>
      )}
      <Row>
        <Button
          borderRadius={10}
          height={50}
          width={100}
          alignCenter
          row
          onPress={() => setShowFavorites(!showFavorites)}>
          <Checkbox
            status={showFavorites ? 'checked' : 'unchecked'}
            theme={theme}
            onPress={() => {}}
          />
          <Text color={isDark ? '#fff' : '#000'}>Favorites</Text>
        </Button>
        <Button
          borderRadius={10}
          height={50}
          width={100}
          alignCenter
          row
          onPress={() => setDisplayHidden(!displayHidden)}>
          <Checkbox
            status={displayHidden ? 'checked' : 'unchecked'}
            theme={theme}
            onPress={() => {}}
          />
          <Text color={isDark ? '#fff' : '#000'}>Hidden</Text>
        </Button>
      </Row>
      <ScrollView>
        {foundMovies &&
          foundMovies.map(movie => {
            if (insideHidden(movie) && !displayHidden) {
              return <View />
            }
            const time = Number(new Date())
            return (
              <Row bg={isDark ? '#1a1a1a' : '#dedede'} key={`${time}_${movie.imdbID}`} mb={10}>
                <Button onPress={() => onPressMovie?.(movie)}>
                  <Image height={200} mr={3} source={{ uri: movie.Poster }} width={140} />
                </Button>
                <Column px={2} py={2} stretch>
                  <Row mb={2} alignCenter>
                    <Icon height={30} ml={-1} mr={1} source={starIcon} width={30} />
                    <Text color={isDark ? '#fff' : '#000'} wrap>
                      {movie.imdbRating}
                    </Text>
                  </Row>
                  <Text color={isDark ? '#fff' : '#000'} wrap>
                    {movie.Title}
                  </Text>
                  <Row>
                    <Button
                      bg={isDark ? '#1e1e1e' : '#cecece'}
                      borderRadius={10}
                      height={65}
                      width={75}
                      alignCenter
                      justifyCenter
                      onPress={() => onPressToggleFavorite?.(movie)}>
                      {(insideFavorites(movie) && (
                        <Icon height={30} source={favoriteIcon} width={30} />
                      )) || <Icon height={30} source={favoriteBorderWhiteIcon} width={30} />}
                    </Button>
                    <Button
                      borderRadius={10}
                      height={65}
                      width={75}
                      alignCenter
                      justifyCenter
                      onPress={() => onPressToggleHide?.(movie)}>
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
