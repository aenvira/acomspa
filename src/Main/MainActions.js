// import { Observable } from 'rxjs'

export const TOGGLE_CHANNELS_IN_VIEW = 'TOGGLE_CHANNELS_IN_VIEW'
export const TOGGLE_MESSAGES_IN_VIEW = 'TOGGLE_MESSAGES_IN_VIEW'

export const toggleChannelsInView = inView => ({ type: TOGGLE_CHANNELS_IN_VIEW, payload: inView })

export const toggleMessagesInView = inView => ({ type: TOGGLE_MESSAGES_IN_VIEW, payload: inView })
