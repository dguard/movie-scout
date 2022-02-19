import { FoundMovie } from 'models/movie'

export interface IFavoriteToggleAction {
  favorites: { [id: string]: FoundMovie }
}
