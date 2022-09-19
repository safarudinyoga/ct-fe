import { ActionType } from '../action-types/train-type'
import { ActionTrains, GetTrainReducers } from 'state/actions/trains-actions-types'

const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  list_station: []
}

const reducer = (state: GetTrainReducers = initialState, action: ActionTrains): GetTrainReducers => {
  switch (action.type) {
    case ActionType.GET_LIST_STATION_PENDING:
      return {
        ...state,
        isLoading: true
      }

    case ActionType.GET_LIST_STATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list_station: action.payload
      }

    case ActionType.GET_LIST_STATION_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message
      }

    default:
      return state;
  }
}

export default reducer

