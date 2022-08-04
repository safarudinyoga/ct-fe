import { ActionTypeRegister, ActionTypeLogin, ActionTypeOTP, ActionTypeForgotPassword } from '../action-types/auth-types';

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

interface PostForgotPasswordPending {
  type: ActionTypeForgotPassword.POST_FORGOTPASSWORD_PENDING
}

interface PostForgotPasswordSuccess {
  type: ActionTypeForgotPassword.POST_FORGOTPASSWORD_SUCCESS,
}

interface PostForgotPasswordFailed {
  type: ActionTypeForgotPassword.POST_FORGOTPASSWORD_FAILED,
  message: any
}

export type ActionRegister = PostRegisterPending | PostRegisterSuccess | PostRegisterFailed

export type ActionLogin = PostLoginPending | PostLoginSuccess | PostLoginFailed

export type ActionOTP = PostOTPPending | PostOTPSuccess | PostOTPFailed | any

export type ActionForgotPassword = PostForgotPasswordPending | PostForgotPasswordSuccess | PostForgotPasswordFailed

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
  user_logged: User_Logged
}

interface User_Logged {
  access_token: string,
  initials_name: string
  email: string
}

export interface ForgotPasswordReducers {
  message: string,
  isLoading: boolean,
  isError: boolean
}