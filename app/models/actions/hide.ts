import { FoundMovie } from 'models/reducers/favorite'

export interface IHideToggleAction {
  hidden: { [id: string]: FoundMovie }
}
