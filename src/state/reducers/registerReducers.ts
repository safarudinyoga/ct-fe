import { ActionTypeRegister } from '../action-types/auth-types'
import { RegisterReducers, ActionRegister } from 'state/actions/auth-actions-types'

const initialState = {
  isLoading: false,
  isError: false,
  message: '',
}

const reducer = (state: RegisterReducers = initialState, action: ActionRegister): RegisterReducers => {
  switch (action.type) {
    case ActionTypeRegister.POST_REGISTER_PENDING:
      return {
        ...state,
        isLoading: true
      }

    case ActionTypeRegister.POST_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false
      }

    case ActionTypeRegister.POST_REGISTER_FAILED:
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