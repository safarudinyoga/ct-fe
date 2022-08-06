import { Dispatch } from "redux"
import { _axios, authUrl } from "utils/_axios";
import { ActionTypeRegister } from "../action-types/auth-types"
import { ActionRegister } from "../actions/auth-actions-types"
import { RESPONSE_STATUS } from '../../utils/apiHelper';
import { history } from "index";

export const postRegister = (payload: any) => {
  return async (dispatch: Dispatch<ActionRegister>) => {
    dispatch({
      type: ActionTypeRegister.POST_REGISTER_PENDING
    })

    try {
      const { data: { data }, status } = await _axios.post(`${authUrl}/user/register`, payload)
      if (RESPONSE_STATUS.includes(status)) {
        dispatch({
          type: ActionTypeRegister.POST_REGISTER_SUCCESS,
          payload: data
        })
        history.replace('/login')
      }
    } catch (error: any) {
      dispatch({
        type: ActionTypeRegister.POST_REGISTER_FAILED,
        message: error
      })
    }
  }
}