import {
  MESSAGES_REQ,
  MESSAGES_FAILED,
  MESSAGES_CONNECT,
  INITIAL_MESSAGES_FAILED,
  INITIAL_MESSAGES_SUCCESS,
  MESSAGE_RECEIVED,
  MESSAGE_FAILED
} from './MessagesActions'

export const chatSocket = (state = {}, { type, payload }) => {
  switch (type) {
    case MESSAGES_REQ:
      return state
    case MESSAGES_FAILED:
      return { error: payload }
    case MESSAGES_CONNECT:
      return payload
    default:
      return state
  }
}

export const messages = (state = [], { type, payload }) => {
  switch (type) {
    case INITIAL_MESSAGES_FAILED:
    case MESSAGE_FAILED:
      return state
    case INITIAL_MESSAGES_SUCCESS:
      return payload.messages
    case MESSAGE_RECEIVED:
      return [ ...state, payload.message ]
    default:
      return state
  }
}
