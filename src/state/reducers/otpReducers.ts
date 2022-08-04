import { ActionTypeOTP } from '../action-types/auth-types'
import { OTPReducers, ActionOTP } from 'state/actions/auth-actions-types'

const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  user_logged: {
    access_token: '',
    initials_name: '',
    email: ''
  }
}

const reducer = (state: OTPReducers = initialState, action: ActionOTP): OTPReducers => {
  switch (action.type) {
    case ActionTypeOTP.POST_OTP_PENDING:
      return {
        ...state,
        isLoading: true
      }

    case ActionTypeOTP.POST_OTP_SUCCESS:
      console.log(action, 'act');
      return {
        ...state,
        isLoading: false,
        user_logged: action.payload
      }

    case ActionTypeOTP.POST_OTP_FAILED:
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

export default reducer;