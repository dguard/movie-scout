import { FoundMovie } from './favorite'

export interface IHideState {
  hidden: { [id: string]: FoundMovie }
}
