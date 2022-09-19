import { Dispatch } from "redux"
import { ActionType } from "../action-types/train-type"
import { ActionTrains } from '../actions/trains-actions-types';
import { _axios, transportUrl, defaultConfig, userUrl } from "utils/_axios";
import { RESPONSE_STATUS } from '../../utils/apiHelper';

const url =  "https://api.caritempat.id";

export const callApiSearchTrain = () => {
  return async (dispatch: Dispatch<ActionTrains>) => {
    dispatch({
      type: ActionType.GET_LIST_STATION_PENDING
    })

    try {
      const { data: { data }, status } = await _axios.get(`${userUrl}${transportUrl}/train/stations`, {
        ...defaultConfig()
      })
      if (RESPONSE_STATUS.includes(status)) {
        dispatch({
          type: ActionType.GET_LIST_STATION_SUCCESS,
          payload: data
        })
      }
    } catch (error) {
      dispatch({
        type: ActionType.GET_LIST_STATION_FAILED,
        message: error
      })
    }
  }
}