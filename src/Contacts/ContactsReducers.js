import {
  ADD_CONTACT_SUCCESS,
  FETCH_CONTACTS_REQ,
  FETCH_CONTACTS_FAILED,
  FETCH_CONTACTS_SUCCESS,
  USERS_REQ,
  USERS_FAILED,
  USERS_SUCCESS
} from './ContactsActions'

export const contacts = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_CONTACTS_REQ:
      return state
    case FETCH_CONTACTS_FAILED:
      return state
    case FETCH_CONTACTS_SUCCESS:
    case ADD_CONTACT_SUCCESS:
      return payload.contacts
    default:
      return state
  }
}

export const allusers = (state = [], { type, payload }) => {
  switch (type) {
    case USERS_REQ:
      return state
    case USERS_FAILED:
      return state
    case USERS_SUCCESS:
      return payload.users
    default:
      return state
  }
}
