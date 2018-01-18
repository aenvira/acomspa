import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { isOnline } from '../StartPage/StartPageReducers'
import { isAuthenticated, authToken, forgotPassword, resetPassword } from '../Auth/AuthReducers'
import { LOGOUT_SUCCESS } from '../Auth/AuthActions'
import { currentUser } from '../Account/AccountReducers'
import { channels, channelsSocket, latestMessages, selectedChannel } from '../Channels/ChannelsReducers'
import { messages, chatSocket } from '../Messages/MessagesReducers'
import { channelsInView, messagesInView } from '../Main/MainReducers'
import { contacts, allusers } from '../Contacts/ContactsReducers'

const reducer = combineReducers({
  form: formReducer,
  isOnline,
  isAuthenticated,
  authToken,
  forgotPassword,
  resetPassword,
  currentUser,
  channels,
  channelsSocket,
  latestMessages,
  messages,
  chatSocket,
  selectedChannel,
  channelsInView,
  messagesInView,
  contacts,
  allusers
})

const rootReducer = reducer => (state = {}, action) => {
  return action.type === LOGOUT_SUCCESS
    ? reducer({}, action)
    : reducer(state, action)
}

export default rootReducer(reducer)
