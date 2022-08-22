import { Dispatch } from "redux"
import { _axios, authUrl } from "utils/_axios";
import { ActionTypeOTP } from "../action-types/auth-types"
import { ActionOTP } from "../actions/auth-actions-types"
import { RESPONSE_STATUS } from '../../utils/apiHelper';
import { history } from "index";
import { setCookie, SITE_COOKIES } from '../../utils/cookies';
import { initials } from '../../utils/initials';

export const postOTP = (payload: any) => {
  return async (dispatch: Dispatch<ActionOTP>) => {
    dispatch({
      type: ActionTypeOTP.POST_OTP_PENDING
    })

    try {
      const { data: { data }, status } = await _axios.post(`${authUrl}/user/verify-otp`, payload)
      if (RESPONSE_STATUS.includes(status)) {
        dispatch(getUserData(data.access_token))
      }
    } catch (error: any) {
      dispatch({
        type: ActionTypeOTP.POST_OTP_FAILED,
        message: error
      })
    }
  }
}

export const getUserData = (token: any) => {
  return async (dispatch: Dispatch<ActionOTP>) => {
    try {
      const { data: { data }, status } = await _axios.post(`${authUrl}/validation-token/user`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (RESPONSE_STATUS.includes(status)) {

        dispatch({
          type: ActionTypeOTP.POST_OTP_SUCCESS,
          payload: {
            ...data,
            access_token: token,
            initials_name: initials(data.name)
          }
        })
        await setCookie(SITE_COOKIES.ACCESSTOKEN, token, 1)
        await setCookie(SITE_COOKIES.FULLNAME, data.name, 1)
        await setCookie(SITE_COOKIES.PHONE, data.phone, 1)
        await setCookie(SITE_COOKIES.NAME, initials(data.name), 1)
        await setCookie(SITE_COOKIES.EMAIL, data.email, 1)
        await history.push('/')
      }
    } catch (error) {
      dispatch({
        type: ActionTypeOTP.POST_OTP_FAILED,
        message: error
      })
    }
  }
}