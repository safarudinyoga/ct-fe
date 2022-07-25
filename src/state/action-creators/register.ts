import { Dispatch } from "redux"
import { _axios } from "utils/_axios";
import { ActionType } from "../action-types/register-types"
import { Action } from "../actions/register"
import { RESPONSE_STATUS } from '../../utils/apiHelper';

const url =  "/auth";

export const postRegister = (payload: any) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.POST_REGISTER_PENDING
    })

    try {
      const { data: { data }, status } = await _axios.post(`${url}/user/register`, payload)
      if (RESPONSE_STATUS.includes(status)) {
        dispatch({
          type: ActionType.POST_REGISTER_SUCCESS,
          payload: data
        })
      }
    } catch (error: any) {
      dispatch({
        type: ActionType.POST_REGISTER_FAILED,
        message: error
      })
    }
  }
}