import {
  TOGGLE_CHANNELS_IN_VIEW,
  TOGGLE_MESSAGES_IN_VIEW
} from './MainActions'

export const channelsInView = (state = true, { type, payload }) => {
  switch (type) {
    case TOGGLE_CHANNELS_IN_VIEW:
      return payload
    default:
      return state
  }
}

export const messagesInView = (state = false, { type, payload }) => {
  switch (type) {
    case TOGGLE_MESSAGES_IN_VIEW:
      return payload
    default:
      return state
  }
}
