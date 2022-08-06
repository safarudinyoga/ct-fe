import { ActionTypeLogin } from '../action-types/auth-types'
import { LoginReducers, ActionLogin } from 'state/actions/auth-actions-types'

const initialState = {
  isLoading: false,
  isError: false,
  message: '',
}

const reducer = (state: LoginReducers = initialState, action: ActionLogin): LoginReducers => {
  switch (action.type) {
    case ActionTypeLogin.POST_LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      }

    case ActionTypeLogin.POST_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false
      }

    case ActionTypeLogin.POST_LOGIN_FAILED:
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