import { FoundMovie } from 'models/movie'

export interface IHideToggleAction {
  hidden: { [id: string]: FoundMovie }
}
