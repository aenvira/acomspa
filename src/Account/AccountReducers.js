import {
  PROFILE_REQ,
  PROFILE_FAILED,
  PROFILE_SUCCESS
} from './AccountActions'
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from '../Auth/AuthActions'

export const currentUser = (state = {}, { type, payload }) => {
  switch (type) {
    case PROFILE_REQ:
      return state
    case PROFILE_FAILED:
      return state
    case PROFILE_SUCCESS:
      return payload
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return payload.user
    default:
      return state
  }
}
