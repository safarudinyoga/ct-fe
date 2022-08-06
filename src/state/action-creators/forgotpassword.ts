import { Dispatch } from "redux"
import { _axios, authUrl } from "utils/_axios";
import { ActionTypeForgotPassword } from "../action-types/auth-types"
import { ActionForgotPassword } from "../actions/auth-actions-types"
import { RESPONSE_STATUS } from '../../utils/apiHelper';
import { message } from "antd";
// import { history } from "index";

export const postForgotPassword = (payload: any) => {
  return async (dispatch: Dispatch<ActionForgotPassword>) => {
    dispatch({
      type: ActionTypeForgotPassword.POST_FORGOTPASSWORD_PENDING
    })

    try {
      const { status } = await _axios.post(`${authUrl}/user/forgot-password`, payload)
      if (RESPONSE_STATUS.includes(status)) {
        dispatch({
          type: ActionTypeForgotPassword.POST_FORGOTPASSWORD_SUCCESS,
        })
        message.success('Reset password successfully, please check your inbox to information')
      }
    } catch (error: any) {
      dispatch({
        type: ActionTypeForgotPassword.POST_FORGOTPASSWORD_FAILED,
        message: error
      })
    }
  }
}