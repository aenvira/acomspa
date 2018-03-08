import { Observable } from 'rxjs'
import getSocket, { socketToStream } from '../socket'

export const JOIN_CHANNEL = 'JOIN_CHANNEL'
export const JOIN_CHANNEL_FAILED = 'JOIN_CHANNEL_FAILED'
export const JOIN_CHANNEL_SUCCESS = 'JOIN_CHANNEL_SUCCESS'

export const LEAVE_CHANNEL = 'LEAVE_CHANNEL'
export const LEAVE_CHANNEL_FAILED = 'LEAVE_CHANNEL_FAILED'
export const LEAVE_CHANNEL_SUCCESS = 'LEAVE_CHANNEL_SUCCESS'

export const MESSAGES_REQ = 'MESSAGES_REQ'
export const MESSAGES_FAILED = 'MESSAGES_FAILED'
export const MESSAGES_CONNECT = 'MESSAGES_CONNECT'

export const INITIAL_MESSAGES_FAILED = 'INITIAL_MESSAGES_FAILED'
export const INITIAL_MESSAGES_SUCCESS = 'INITIAL_MESSAGES_SUCCESS'

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED'
export const MESSAGE_FAILED = 'MESSAGE_FAILED'

export const BROADCAST_MESSAGE = 'BROADCAST_MESSAGE'
export const BROADCAST_MESSAGE_FAILED = 'BROADCAST_MESSAGE_FAILED'
export const BROADCAST_MESSAGE_SUCCESS = 'BROADCAST_MESSAGE_SUCCESS'

export const joinChannel = ({ socket, channelId }) => ({ type: JOIN_CHANNEL, payload: { socket, channelId } })
export const joinChannelEpic = action$ =>
  action$.ofType(JOIN_CHANNEL)
    .do(({ payload }) => payload.socket.emit('join', payload.channelId))
    .map(action => ({ type: JOIN_CHANNEL_SUCCESS }))
    .catch(error => Observable.of({
      type: JOIN_CHANNEL_FAILED,
      payload: error,
      error: true
    }))

export const leaveChannel = ({ socket, channelId }) => ({ type: LEAVE_CHANNEL, payload: { socket, channelId } })
export const leaveChannelEpic = action$ =>
  action$.ofType(LEAVE_CHANNEL)
    .do(({ payload }) => payload.socket.emit('leave', payload.channelId))
    .map(action => ({ type: LEAVE_CHANNEL_SUCCESS }))
    .catch(error => Observable.of({
      type: LEAVE_CHANNEL_FAILED,
      payload: error,
      error: true
    }))

export const requestChat = () => ({ type: MESSAGES_REQ })
export const messagesEpic = action$ =>
  action$.ofType(MESSAGES_REQ)
    .mergeMap(action => {
      const chatSocket = getSocket('chat')
      const connect$ = socketToStream(chatSocket, 'connect')

      return connect$
        .do(res => chatSocket.emit('join'))
        .map(res => ({ type: MESSAGES_CONNECT, payload: chatSocket }))
        .catch(error => Observable.of({
          type: MESSAGES_FAILED,
          payload: error,
          error: true
        }))
    })

export const loadInitialMessagesEpic = action$ =>
  action$.ofType(MESSAGES_CONNECT)
    .mergeMap(action =>
      socketToStream(action.payload, 'loadInitialMessages')
        .map(res => ({
          type: INITIAL_MESSAGES_SUCCESS,
          payload: res
        }))
        .catch(error => Observable.of({
          type: INITIAL_MESSAGES_FAILED,
          payload: error,
          error: true
        }))
    )

export const incomingMessageEpic = action$ =>
  action$.ofType(MESSAGES_CONNECT)
    .mergeMap(action =>
      socketToStream(action.payload, 'addMessage')
        .map(res => ({
          type: MESSAGE_RECEIVED,
          payload: res
        }))
        .catch(error => Observable.of({
          type: MESSAGE_FAILED,
          payload: error,
          error: true
        }))
    )

export const broadcastMessage = ({ socket, channelId, message, cb }) => {
  return {
    type: BROADCAST_MESSAGE,
    payload: { socket, channelId, message, cb }
  }
}
export const broadcastMessageEpic = action$ =>
  action$.ofType(BROADCAST_MESSAGE)
    .do(action => {
      const { socket, channelId, message, cb } = action.payload

      socket.emit('newMessage', channelId, { text: message }, cb)
    })
    .map(action => ({ type: BROADCAST_MESSAGE_SUCCESS, payload: action.payload }))
    .catch(error => Observable.of({
      type: BROADCAST_MESSAGE_FAILED,
      payload: error,
      error: true
    }))
