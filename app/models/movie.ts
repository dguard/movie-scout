export type FoundMovie = {
  imdbID: string
  Poster: string
  imdbVotes: string
  imdbRating: string
  Title: string
}
export type MaybeFoundMovies = FoundMovie[] | null
