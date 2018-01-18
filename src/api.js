import fetch from 'isomorphic-fetch'
import { Observable } from 'rxjs'

const serverUrl = process.env.REACT_APP_SERVER_URL + '/api'

export const setLocalToken = token => localStorage.setItem('token', token)
export const removeLocalToken = _ => localStorage.removeItem('token')

export const getLocalToken = () => localStorage.getItem("token")

const getRemote = (endpoint, headers = {}) => fetch(
    `${serverUrl}/${endpoint}`,
    {
      method: 'GET',
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        ...headers
      }
    }
  )
  .then(response => response.json())
  .then(res => {
    if(res.error) {
      throw res.error
    }

    return res
  })
  .catch(error => {
    console.log('fetch error', error)
    throw error
  })

const postRemote = (endpoint, headers = {}, data) => fetch(
    `${serverUrl}/${endpoint}`,
    {
      method: 'POST',
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify(data)
    }
  )
  .then(response => response.json())
  .then(res => {
    if(res.error) {
      throw res.error
    }

    return res
  })
  .catch(error => {
    console.log('fetch error', error)
    throw error
  })

const withAuthentication = fn => (endpoint, data) => 
  fn(endpoint, {"Authorization": `Bearer ${getLocalToken()}`}, data)

export const isOnline = () =>
  Observable.fromPromise(fetch(`${serverUrl}/isOnline`)
    .then(res => !res.error ? true : false ))

export const login = (data) => Observable.fromPromise(postRemote('login', {}, data))
export const register = (data) => Observable.fromPromise(postRemote('users', {}, data))
export const forgotPassword = data => Observable.fromPromise(postRemote('forgotPassword', {}, data))
export const resetPassword = data => Observable.fromPromise(postRemote('resetPassword', {}, data))
export const getProfile = () => Observable.fromPromise(getRemote('profile', {
  "Authorization": `Bearer ${getLocalToken()}`
}))
export const fetchMyContacts = data => 
  Observable.fromPromise(withAuthentication(getRemote)('contacts'))
export const addToContacts = contact => 
  Observable.fromPromise(withAuthentication(postRemote)('contacts', contact))
export const getUsers = () => 
  Observable.fromPromise(withAuthentication(getRemote)('users'))





///////////////////////
// function connect(cb) {
//   channelsSocket.on('connect', () => {
//     channelsSocket.on('updateChannelsList', channel => {
//       cb(channel)
//     })
//   })
// }
//
// function createChannel(channelName) {
//   console.log('wtf?')
//   channelsSocket.emit('createChannel', channelName)
// }
//
// function joinChat(channelId, username, cb) {
//   const socket = openSocket('http://localhost:5678/chat')
//   socket.on('connect', () => {
//     socket.emit('join', channelId)
//
//     socket.on('updateUsersList', (users, clear) => {
//       console.log('we have received connected users: ', users)
//     })
//
//     socket.on('removeUser', userId => {
//       console.log('Remove user: ', userId)
//     })
//
//     socket.on('addMessage', message => cb(message))
//   })
//
// }
//
// function broadcastMessage(channelName, message) {
//   const socket = openSocket('http://localhost:5678/chat')
//   socket.emit('newMessage', channelName, message)
// }

// export {
//   joinChat,
//   connect,
//   createChannel,
//   broadcastMessage
// }
