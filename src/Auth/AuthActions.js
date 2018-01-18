import { Observable } from 'rxjs'
import { login, register, forgotPassword, resetPassword, setLocalToken, removeLocalToken } from '../api'

export const LOGIN_REQ = 'LOGIN_REQ'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const REGISTER_REQ = 'REGISTER_REQ'
export const REGISTER_FAILED = 'REGISTER_FAILED'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

export const LOGOUT_REQ = 'LOGOUT_REQ'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'

export const FORGOT_PASSWORD_REQ = 'FORGOT_PASSWORD_REQ'
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'

export const RESET_PASSWORD_REQ = 'RESET_PASSWORD_REQ'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'

export const requestLogin = data => ({ type: LOGIN_REQ, payload: data })
export const loginEpic = action$ =>
  action$.ofType(LOGIN_REQ)
    .mergeMap(action =>
      login(action.payload)
        .do(res => setLocalToken(res.token))
        .map(res => ({
          type: LOGIN_SUCCESS,
          payload: res
        }))
        .catch(error => Observable.of({
          type: LOGIN_FAILED,
          payload: error,
          error: true
        }))
    )

export const requestRegister = data => ({ type: REGISTER_REQ, payload: data })
export const registerEpic = action$ =>
  action$.ofType(REGISTER_REQ)
    .mergeMap(action =>
      register(action.payload)
        .do(res => setLocalToken(res.token))
        .map(res => ({
          type: REGISTER_SUCCESS,
          payload: res
        }))
        .catch(error => Observable.of({
          type: REGISTER_FAILED,
          payload: error,
          error: true
        }))
    )

export const logout = () => ({ type: LOGOUT_REQ })
export const logoutEpic = action$ => 
  action$.ofType(LOGOUT_REQ)
    .do(action => removeLocalToken())
    .map(action => ({
      type: LOGOUT_SUCCESS
    }))
    .catch(error => Observable.of({
      type: LOGOUT_FAILED,
      payload: error,
      error: true
    }))

export const requestForgotPassword = data => ({ type: FORGOT_PASSWORD_REQ, payload: data })
export const requestForgotPasswordEpic = action$ => 
  action$.ofType(FORGOT_PASSWORD_REQ)
    .mergeMap(action => 
      forgotPassword(action.payload)
        .map(res => ({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: res
        }))
        .catch(error => Observable.of({
          type: FORGOT_PASSWORD_FAILED,
          payload: error,
          error: true
        }))
    )

export const requestResetPassword = data => ({ type: RESET_PASSWORD_REQ, payload: data })
export const requestResetPasswordEpic = action$ => 
  action$.ofType(RESET_PASSWORD_REQ)
    .mergeMap(action => 
      resetPassword(action.payload)
        .map(res => ({
          type: RESET_PASSWORD_SUCCESS,
          payload: res
        }))
        .catch(error => Observable.of({
          type: RESET_PASSWORD_FAILED,
          payload: error,
          error: true
        }))
    )
