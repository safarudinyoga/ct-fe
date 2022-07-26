import { ActionTypeOTP, ClearDataType } from '../action-types/auth-types'
import { OTPReducers, ActionOTP } from 'state/actions/auth-actions-types'

const initialState = {
  isLoading: false,
  isError: false,
  message: '',
  access_token: ''
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
        access_token: action.payload.access_token
      }

    case ActionTypeOTP.POST_OTP_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message
      }

    case ClearDataType.CLEAR_DATA:
      return initialState

    default:
      return state;
  }
}

export default reducer;