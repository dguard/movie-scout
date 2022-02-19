import React from 'react'
import { Button, Column, Icon, Image, Row, Text } from 'components/ui'
import { FoundMovie } from 'models/movie'

import {
  eyeSlashBlueIcon,
  eyeSlashWhiteIcon,
  favoriteBorderWhiteIcon,
  favoriteIcon,
  starIcon,
} from 'assets'

type Props = {
  movie: FoundMovie
  onPressMovie?: (movie: FoundMovie) => void
  onPressToggleFavorite?: (movie: FoundMovie) => void
  onPressToggleHide?: (value) => void
  insideFavorites: (movie) => any
  insideHidden: (movie) => any
}

export function MovieAtScrollView({
  movie,
  onPressMovie,
  onPressToggleFavorite,
  onPressToggleHide,
  insideFavorites,
  insideHidden,
}: Props) {
  return (
    <Row bg="block.movieAtScrollView.movie.bg" mb={10}>
      <Button onPress={() => onPressMovie?.(movie)}>
        <Image height={200} mr={3} source={{ uri: movie.Poster }} width={140} />
      </Button>
      <Column px={2} py={2} stretch>
        <Row mb={2} alignCenter>
          <Icon height={30} ml={-1} mr={1} source={starIcon} width={30} />
          <Text color="block.movieAtScrollView.imdbRating.color" wrap>
            {movie.imdbRating}
          </Text>
        </Row>
        <Text color="block.movieAtScrollView.title.color" wrap>
          {movie.Title}
        </Text>
        <Row>
          <Button
            bg="block.movieAtScrollView.toggleFavoriteButton.bg"
            borderRadius={10}
            height={65}
            width={75}
            alignCenter
            justifyCenter
            onPress={() => onPressToggleFavorite?.(movie)}>
            {(insideFavorites(movie) && <Icon height={30} source={favoriteIcon} width={30} />) || (
              <Icon height={30} source={favoriteBorderWhiteIcon} width={30} />
            )}
          </Button>
          <Button
            borderRadius={10}
            height={65}
            width={75}
            alignCenter
            justifyCenter
            onPress={() => onPressToggleHide?.(movie)}>
            {(insideHidden(movie) && <Icon height={30} source={eyeSlashBlueIcon} width={30} />) || (
              <Icon height={30} source={eyeSlashWhiteIcon} width={30} />
            )}
          </Button>
        </Row>
      </Column>
    </Row>
  )
}
