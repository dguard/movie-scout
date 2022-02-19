import { FoundMovie } from 'models/movie'

export interface IHideState {
  hidden: { [id: string]: FoundMovie }
}

export interface IHideReducerState {
  hideReducer: IHideState
}
