import Data from '../utils/types'

import {
  LOGIN_REQ,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_REQ,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  FORGOT_PASSWORD_REQ,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQ,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from './AuthActions'

const { Remote } = Data
export const isAuthenticated = (state = false, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return true
    default:
      return state
  }
}

export const authToken = (state = Remote.NotAsked, { type, payload }) => {
  switch (type) {
    case LOGIN_REQ:
    case REGISTER_REQ:
      return Remote.Loading
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return Remote.Succeded(payload.token)
    case LOGIN_FAILED:
    case REGISTER_FAILED:
      return Remote.Failed(payload)
    default:
      return state
  }
}

export const forgotPassword = (state = Remote.NotAsked, { type, payload }) => {
  switch(type) {
    case FORGOT_PASSWORD_REQ:
      return Remote.Loading
    case FORGOT_PASSWORD_SUCCESS:
      return Remote.Succeded(payload.message)
    case FORGOT_PASSWORD_FAILED:
      return Remote.Failed(payload)
    default:
      return state
  }
}

export const resetPassword = (state = Remote.NotAsked, { type, payload }) => {
  switch(type) {
    case RESET_PASSWORD_REQ:
      return Remote.Loading
    case RESET_PASSWORD_SUCCESS:
      return Remote.Succeded(payload.message)
    case RESET_PASSWORD_FAILED:
      return Remote.Failed(payload)
    default:
      return state
  }
}
