import React from 'react'
import { Button, Column, Icon, Image, Row, Text } from 'components/ui'
import { FoundMovie } from 'models/movie'

import { starIcon } from 'assets'

type Props = {
  movie: FoundMovie
  onPressMovie?: (movie) => void
}

export function MovieAtFavorites({ movie, onPressMovie }: Props) {
  return (
    <Button onPress={() => onPressMovie?.(movie)}>
      <Column bg="block.movieAtFavorites.card.bg" height={250} mr={3} width={105}>
        <Image height={150} mr={3} source={{ uri: movie.Poster }} width={105} />
        <Column px={2} py={2} stretch>
          <Row mb={2} alignCenter>
            <Icon height={15} mr={1} source={starIcon} width={15} />
            <Text color="block.movieAtFavorites.imdbRating.color" wrap>
              {movie.imdbRating}
            </Text>
          </Row>
          <Text color="block.movieAtFavorites.title.color" wrap>
            {movie.Title}
          </Text>
        </Column>
      </Column>
    </Button>
  )
}
