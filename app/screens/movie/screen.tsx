import React from 'react'
import { Button, Column, Icon, Image, Row, Text } from 'components/ui'

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
  insideFavorites: (movie) => any
  insideHidden: (movie) => any
}

export function MovieScreen({
  route,
  onPressToggleFavorite,
  onPressToggleHide,
  insideFavorites,
  insideHidden,
}: Props) {
  const { movie: foundMovie } = route.params

  return (
    <Column bg="screen.movieScreen.column.bg" key={`${foundMovie.imdbID}`} justifyCenter stretch>
      <Column height={640} pb={4} pt={4} alignCenter>
        <Image height={400} mb={3} mr={3} source={{ uri: foundMovie.Poster }} width={280} />
        <Row mb={2} width={70} alignCenter>
          <Icon height={30} mr={1} source={starIcon} width={30} />

          <Text color="screen.movieScreen.imdbRating.color" wrap>
            {foundMovie.imdbRating}
          </Text>
        </Row>
        <Text color="screen.movieScreen.movieTitle.color" fontSize={2} wrap>
          {foundMovie.Title}
        </Text>
        <Row>
          <Button
            bg="screen.movieScreen.toggleFavoriteButton.bg"
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
