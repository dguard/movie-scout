import { FoundMovie } from 'models/reducers/favorite'

export interface IFavoriteToggleAction {
  favorites: { [id: string]: FoundMovie }
}
