import { ActionType } from '../action-types/train-type'

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

export interface GetTrainReducers {
  message: string,
  isLoading: boolean,
  isError: boolean,
  list_station: any[]
}