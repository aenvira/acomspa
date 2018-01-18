import openSocket from 'socket.io-client'
import { Observable } from 'rxjs'
import { getLocalToken } from './api'

const serverURL = process.env.REACT_APP_SERVER_URL

const getSocket = namespace => {
  const token = getLocalToken()
  return openSocket(`${serverURL}/${namespace}`, { query: { token: token } })
}

export const socketToStream = (socket, event) =>
  Observable.create($ => {
    socket.on(event, data => $.next(data))
  })

export default getSocket
