import { ActionTypeRegister, ActionTypeLogin, ActionTypeOTP, ClearDataType } from '../action-types/auth-types';

interface PostRegisterPending {
  type: ActionTypeRegister.POST_REGISTER_PENDING
}

interface PostRegisterSuccess {
  type: ActionTypeRegister.POST_REGISTER_SUCCESS,
  payload: any
}

interface PostRegisterFailed {
  type: ActionTypeRegister.POST_REGISTER_FAILED,
  message: any
}

interface PostLoginPending {
  type: ActionTypeLogin.POST_LOGIN_PENDING
}

interface PostLoginSuccess {
  type: ActionTypeLogin.POST_LOGIN_SUCCESS,
  payload: any
}

interface PostLoginFailed {
  type: ActionTypeLogin.POST_LOGIN_FAILED,
  message: any
}

interface PostOTPPending {
  type: ActionTypeOTP.POST_OTP_PENDING
}

interface PostOTPSuccess {
  type: ActionTypeOTP.POST_OTP_SUCCESS,
  payload: any
}

interface PostOTPFailed {
  type: ActionTypeOTP.POST_OTP_FAILED,
  message: any
}

export interface ClearData {
  type: ClearDataType.CLEAR_DATA
}

export type ActionRegister = PostRegisterPending | PostRegisterSuccess | PostRegisterFailed

export type ActionLogin = PostLoginPending | PostLoginSuccess |PostLoginFailed

export type ActionOTP = PostOTPPending | PostOTPSuccess |PostOTPFailed | ClearData

// Reducers
export interface LoginReducers {
  message: string,
  isLoading: boolean,
  isError: boolean
}

export interface RegisterReducers {
  message: string,
  isLoading: boolean,
  isError: boolean
}

export interface OTPReducers {
  message: string,
  isLoading: boolean,
  isError: boolean,
  access_token: string
}