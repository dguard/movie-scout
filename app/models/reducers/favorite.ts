import { FoundMovie } from 'models/movie'

export interface IFavoriteState {
  favorites: { [id: string]: FoundMovie }
}

export interface IFavoriteReducerState {
  favoriteReducer: IFavoriteState
}
