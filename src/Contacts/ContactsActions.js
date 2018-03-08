import { Observable } from 'rxjs'
import { fetchMyContacts, getUsers, addToContacts } from '../api'

export const ADD_CONTACT_REQ = 'ADD_CONTACT_REQ'
export const ADD_CONTACT_FAILED = 'ADD_CONTACT_FAILED'
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS'

export const FETCH_CONTACTS_REQ = 'FETCH_CONTACTS_REQ'
export const FETCH_CONTACTS_FAILED = 'FETCH_CONTACTS_FAILED'
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS'

export const USERS_REQ = 'USERS_REQ'
export const USERS_FAILED = 'USERS_FAILED'
export const USERS_SUCCESS = 'USERS_SUCCESS'

export const addContact = contact => ({ type: ADD_CONTACT_REQ, payload: contact })
export const addContactEpic = action$ =>
  action$.ofType(ADD_CONTACT_REQ)
    .mergeMap(action =>
      addToContacts(action.payload)
        .map(res => ({
          type: ADD_CONTACT_SUCCESS,
          payload: res
        }))
        .catch(error => Observable.of({
          type: ADD_CONTACT_FAILED,
          payload: error,
          error: true
        }))
    )

export const requestContacts = user => ({ type: FETCH_CONTACTS_REQ, payload: user })
export const fetchContactsEpic = action$ =>
  action$.ofType(FETCH_CONTACTS_REQ)
    .mergeMap(action =>
      fetchMyContacts(action.payload)
        .map(res => ({
          type: FETCH_CONTACTS_SUCCESS,
          payload: res
        }))
        .catch(error => Observable.of({
          type: FETCH_CONTACTS_FAILED,
          payload: error,
          error: true
        }))
    )

export const requestUsers = () => ({ type: USERS_REQ })
export const requestUsersEpic = action$ =>
  action$.ofType(USERS_REQ)
    .mergeMap(action =>
      getUsers()
        .map(res => ({
          type: USERS_SUCCESS,
          payload: res
        }))
        .catch(error => Observable.of({
          type: USERS_FAILED,
          payload: error,
          error: true
        }))
    )
