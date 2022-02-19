import React, { useCallback } from 'react'
import { Button, Column, Icon, Image, Row, Text } from 'components/ui'
import { FoundMovie } from 'models/movie'
import { IFavoriteState, IHideState } from 'models/reducers'

import {
  eyeSlashBlueIcon,
  eyeSlashWhiteIcon,
  favoriteBorderWhiteIcon,
  favoriteIcon,
  starIcon,
} from 'assets'

type Props = {
  route?: any
  onPressToggleFavorite?: (value) => void
  onPressToggleHide?: (value) => void
  isDark: boolean
  favorites: IFavoriteState['favorites']
  hidden: IHideState['hidden']
}

function MovieScreen({
  route,
  onPressToggleFavorite,
  onPressToggleHide,
  isDark,
  favorites,
  hidden,
}: Props) {
  const { movie: foundMovie } = route.params

  const insideFavorites = useCallback((movie: FoundMovie) => favorites[movie.imdbID], [favorites])
  const insideHidden = useCallback((movie: FoundMovie) => hidden[movie.imdbID], [hidden])

  return (
    <Column bg={isDark ? '#1a1a1a' : '#dedede'} justifyCenter stretch>
      <Column
        bg={isDark ? '#1a1a1a' : '#dedede'}
        height={640}
        key={`${foundMovie.imdbID}`}
        pb={4}
        pt={4}
        alignCenter>
        <Image height={400} mb={3} mr={3} source={{ uri: foundMovie.Poster }} width={280} />
        <Row mb={2} width={70} alignCenter>
          <Icon height={30} mr={1} source={starIcon} width={30} />

          <Text color={isDark ? '#fff' : '#000'} wrap>
            {foundMovie.imdbRating}
          </Text>
        </Row>
        <Text color={isDark ? '#fff' : '#000'} fontSize={2} wrap>
          {foundMovie.Title}
        </Text>
        <Row>
          <Button
            bg={isDark ? '#1e1e1e' : '#cecece'}
            borderRadius={10}
            height={65}
            width={75}
            alignCenter
            justifyCenter
            onPress={() => onPressToggleFavorite?.(foundMovie)}>
            {(insideFavorites(foundMovie) && (
              <Icon height={30} source={favoriteIcon} width={30} />
            )) || <Icon height={30} source={favoriteBorderWhiteIcon} width={30} />}
          </Button>
          <Button
            borderRadius={10}
            height={65}
            width={75}
            alignCenter
            justifyCenter
            onPress={() => onPressToggleHide?.(foundMovie)}>
            {(insideHidden(foundMovie) && (
              <Icon height={30} source={eyeSlashBlueIcon} width={30} />
            )) || <Icon height={30} source={eyeSlashWhiteIcon} width={30} />}
          </Button>
        </Row>
      </Column>
    </Column>
  )
}

export default MovieScreen
