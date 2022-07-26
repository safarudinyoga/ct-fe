import { Dispatch } from "redux"
import { _axios, authUrl } from "utils/_axios";
import { ActionTypeOTP, ClearDataType } from "../action-types/auth-types"
import { ActionOTP, ClearData } from "../actions/auth-actions-types"
import { RESPONSE_STATUS } from '../../utils/apiHelper';
import { history } from "index";
import { setCookie, SITE_COOKIES } from '../../utils/cookies';

export const postOTP = (payload: any) => {
  return async (dispatch: Dispatch<ActionOTP>) => {
    dispatch({
      type: ActionTypeOTP.POST_OTP_PENDING
    })

    try {
      const { data: { data }, status } = await _axios.post(`${authUrl}/user/verify-otp`, payload)
      if (RESPONSE_STATUS.includes(status)) {
        dispatch({
          type: ActionTypeOTP.POST_OTP_SUCCESS,
          payload: data
        })
        setCookie(SITE_COOKIES.ACCESSTOKEN, data.access_token, 1)
        history.replace('/')
      }
    } catch (error: any) {
      dispatch({
        type: ActionTypeOTP.POST_OTP_FAILED,
        message: error
      })
    }
  }
}

export const clearData = () => {
  return (dispatch: Dispatch<ClearData>) => {
    dispatch({
      type: ClearDataType.CLEAR_DATA
    })
  }
}