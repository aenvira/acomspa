import { Observable } from 'rxjs'
import getSocket, { socketToStream } from '../socket'

//const channelsSocket = getSocket('channels')
//let channelsSocket
export const CHANNELS_REQ = 'CHANNELS_REQ'
export const CHANNELS_FAILED = 'CHANNELS_FAILED'
export const CHANNELS_CONNECT = 'CHANNELS_CONNECT'

export const INITIAL_CHANNELS_FAILED = 'INITIAL_CHANNELS_FAILED'
export const INITIAL_CHANNELS_SUCCESS = 'INITIAL_CHANNELS_SUCCESS'

export const UPDATE_CHANNELS_FAILED = 'UPDATE_CHANNELS_FAILED'
export const UPDATE_CHANNELS_SUCCESS = 'UPDATE_CHANNELS_SUCCESS'

export const NEW_MESSAGE_FAILED = 'NEW_MESSAGE_FAILED'
export const NEW_MESSAGE_RECEIVED = 'NEW_MESSAGE_RECEIVED'

export const RESET_UNREAD_MESSAGE = 'RESET_UNREAD_MESSAGE'

export const SET_CHANNEL = 'SET_CHANNEL'

export const NEW_CHANNEL_REQ = 'NEW_CHANNEL_REQ'
export const NEW_CHANNEL_FAILED = 'NEW_CHANNEL_FAILED'
export const NEW_CHANNEL_SUCCESS = 'NEW_CHANNEL_SUCCESS'
export const NEW_PRIVATE_CHANNEL_REQ = 'NEW_PRIVATE_CHANNEL_REQ'
export const NEW_PRIVATE_CHANNEL_FAILED = 'NEW_PRIVATE_CHANNEL_FAILED'
export const NEW_PRIVATE_CHANNEL_SUCCESS = 'NEW_PRIVTE_CHANNEL_SUCCESS'

export const requestChannels = () => ({ type: CHANNELS_REQ })

export const channelsEpic = action$ =>
  action$.ofType(CHANNELS_REQ)
    .mergeMap(action => {
      const channelsSocket = getSocket('channels')
      const connect$ = socketToStream(channelsSocket, 'connect')
      return connect$
        .do(res => channelsSocket.emit('loadInitialChannels'))
        .map(res => ({ type: CHANNELS_CONNECT, payload: channelsSocket }))
        .catch(error => Observable.of({
          type: CHANNELS_FAILED,
          payload: error,
          error: true
        }))
    })

export const loadInitialChannelsEpic = action$ =>
  action$.ofType(CHANNELS_CONNECT)
    .mergeMap(action =>
      socketToStream(action.payload, 'initialChannelsList')
        .map(res => ({
          type: INITIAL_CHANNELS_SUCCESS,
          payload: res
        }))
        .catch(error => Observable.of({
          type: INITIAL_CHANNELS_FAILED,
          payload: error,
          error: true
        }))
    )

export const updateChannelsEpic = action$ =>
  action$.ofType(CHANNELS_CONNECT)
    .mergeMap(action =>
      socketToStream(action.payload, 'updateChannelsList')
        .map(res => ({
          type: UPDATE_CHANNELS_SUCCESS,
          payload: res
        }))
        .catch(error => Observable.of({
          type: UPDATE_CHANNELS_FAILED,
          payload: error,
          error: true
        }))
    )

export const newMessageInChannelEpic = action$ =>
  action$.ofType(CHANNELS_CONNECT)
    .mergeMap(action =>
      socketToStream(action.payload, 'newMessageInChannel')
        .map(res => ({
          type: NEW_MESSAGE_RECEIVED,
          payload: res
        }))
        .catch(error => Observable.of({
          type: NEW_MESSAGE_FAILED,
          payload: error,
          error: true
        }))
    )

export const resetUnreadMessages = channelId => ({
  type: RESET_UNREAD_MESSAGE,
  payload: channelId
})

export const setSelectedChannel = channel => ({
  type: SET_CHANNEL,
  payload: channel
})

export const createChannel = data => ({ type: NEW_CHANNEL_REQ, payload: data })
export const createChannelEpic = action$ =>
  action$.ofType(NEW_CHANNEL_REQ)
    .do(action => {
      action.payload.socket.emit('createChannel', {
        name: action.payload.channelName,
        participants: action.payload.channelParticipants
      })
    })
    .map(action => ({ type: NEW_CHANNEL_SUCCESS }))
    .catch(error => Observable.of({
      type: NEW_CHANNEL_FAILED,
      payload: error,
      error: true
    }))

export const createPrivateChannel = data => ({ type: NEW_PRIVATE_CHANNEL_REQ, payload: data })
export const createPrivateChannelEpic = action$ =>
  action$.ofType(NEW_PRIVATE_CHANNEL_REQ)
    .do(action => {
      action.payload.socket.emit('createPrivateChannel', {
        inviter: action.payload.inviter,
        invitee: action.payload.invitee
      })
    })
    .map(action => ({ type: NEW_PRIVATE_CHANNEL_SUCCESS }))
    .catch(error => Observable.of({
      type: NEW_PRIVATE_CHANNEL_FAILED,
      payload: error,
      error: true
    }))
