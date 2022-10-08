import { ActionType, ActionTypeAvailability } from '../action-types/train-type'

interface GetListStationPending {
  type: ActionType.GET_LIST_STATION_PENDING
}

interface GetListStationSuccess {
  type: ActionType.GET_LIST_STATION_SUCCESS,
  payload: any
}

interface GetListStationFailed {
  type: ActionType.GET_LIST_STATION_FAILED,
  message: any
}

export type ActionTrains = GetListStationPending | GetListStationSuccess | GetListStationFailed

interface PostStationAvailability {
  type: ActionTypeAvailability.POST_STATION_AVAILABILITY,
  payload: any
}

interface PostStationPending {
  type: ActionTypeAvailability.POST_STATION_AVAILABILITY_LOADING
}

interface PostStationFailed {
  type: ActionTypeAvailability.POST_STATION_AVAILABILITY_FAILED,
  message: any
}

export type ActionTrainAvailability = PostStationAvailability | PostStationPending | PostStationFailed

export interface GetTrainReducers {
  message: string,
  isLoading: boolean,
  isError: boolean,
  list_station: any[]
}