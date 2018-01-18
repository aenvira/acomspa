//import Data from '../utils/types'

import {
  CHANNELS_REQ,
  CHANNELS_FAILED,
  CHANNELS_CONNECT,
  INITIAL_CHANNELS_FAILED,
  INITIAL_CHANNELS_SUCCESS,
  UPDATE_CHANNELS_FAILED,
  UPDATE_CHANNELS_SUCCESS,
  NEW_MESSAGE_FAILED,
  NEW_MESSAGE_RECEIVED,
  RESET_UNREAD_MESSAGE,
  SET_CHANNEL
} from './ChannelsActions'

export const channels = (state = [], { type, payload }) => {
  switch (type) {
    case INITIAL_CHANNELS_FAILED:
    case UPDATE_CHANNELS_FAILED:
      return payload
    case INITIAL_CHANNELS_SUCCESS:
      return payload.channels
    case UPDATE_CHANNELS_SUCCESS:
      return [...state, payload.channel]
    default:
      return state
  }
}

export const channelsSocket = (state = {}, { type, payload }) => {
  switch (type) {
    case CHANNELS_REQ:
      return state
    case CHANNELS_FAILED:
      return { error: payload }
    case CHANNELS_CONNECT:
      return payload
    default:
      return state
  }
}

export const latestMessages = (state = {},  { type, payload }) => {
  switch (type) {
    case NEW_MESSAGE_FAILED:
      return state
    case NEW_MESSAGE_RECEIVED:
      return { ...state, [payload.channelId]: { message: payload.message, read: false } }
    case RESET_UNREAD_MESSAGE:
      return { ...state, [payload.channelId]: { ...state[payload.channelId], read: true }}
    default:
      return state
  }
}

export const selectedChannel = (state = {},  { type, payload }) => {
  switch (type) {
    case SET_CHANNEL:
      return payload
    default:
      return state
  }
}
