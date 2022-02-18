export type FoundMovie = {
  imdbID: string
  Poster: string
  imdbVotes: string
  imdbRating: string
  Title: string
}

export interface IFavoriteState {
  favorites: { [id: string]: FoundMovie }
}
