import { ActionTypeForgotPassword } from '../action-types/auth-types'
import { ForgotPasswordReducers, ActionForgotPassword } from 'state/actions/auth-actions-types'

const initialState = {
  isLoading: false,
  isError: false,
  message: '',
}

const reducer = (state: ForgotPasswordReducers = initialState, action: ActionForgotPassword): ForgotPasswordReducers => {
  switch (action.type) {
    case ActionTypeForgotPassword.POST_FORGOTPASSWORD_PENDING:
      return {
        ...state,
        isLoading: true
      }

    case ActionTypeForgotPassword.POST_FORGOTPASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false
      }

    case ActionTypeForgotPassword.POST_FORGOTPASSWORD_FAILED:
      alert(action.message)
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