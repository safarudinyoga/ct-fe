import { Dispatch } from "redux"
import { _axios, authUrl } from "utils/_axios";
import { ActionTypeLogin } from "../action-types/auth-types"
import { ActionLogin } from "../actions/auth-actions-types"
import { RESPONSE_STATUS } from '../../utils/apiHelper';
import { history } from "index";

export const postLogin = (payload: any) => {
  return async (dispatch: Dispatch<ActionLogin>) => {
    dispatch({
      type: ActionTypeLogin.POST_LOGIN_PENDING
    })

    try {
      const { data: { data }, status } = await _axios.post(`${authUrl}/user/login`, payload)
      if (RESPONSE_STATUS.includes(status)) {
        dispatch({
          type: ActionTypeLogin.POST_LOGIN_SUCCESS,
          payload: data
        })
        history.replace('/otp')
      }
    } catch (error: any) {
      dispatch({
        type: ActionTypeLogin.POST_LOGIN_FAILED,
        message: error
      })
    }
  }
}