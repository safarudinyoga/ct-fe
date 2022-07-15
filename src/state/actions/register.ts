import { ActionType } from '../action-types/register-types';

interface PostRegisterPending {
  type: ActionType.POST_REGISTER_PENDING
}

interface PostRegisterSuccess {
  type: ActionType.POST_REGISTER_SUCCESS,
  payload: any
}

interface PostRegisterFailed {
  type: ActionType.POST_REGISTER_FAILED,
  message: any
}

export type Action = PostRegisterPending | PostRegisterSuccess | PostRegisterFailed

