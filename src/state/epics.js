import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { checkOnlineStatus } from '../StartPage/StartPageActions'
import { 
  loginEpic, 
  registerEpic, 
  logoutEpic, 
  requestForgotPasswordEpic,
  requestResetPasswordEpic
} from '../Auth/AuthActions'
import { profileEpic } from '../Account/AccountActions'
import { fetchContactsEpic, addContactEpic, requestUsersEpic } from '../Contacts/ContactsActions'
import {
  channelsEpic,
  loadInitialChannelsEpic,
  updateChannelsEpic,
  newMessageInChannelEpic,
  createChannelEpic,
  createPrivateChannelEpic
} from '../Channels/ChannelsActions'
import {
  joinChannelEpic,
  leaveChannelEpic,
  messagesEpic,
  loadInitialMessagesEpic,
  incomingMessageEpic,
  broadcastMessageEpic
} from '../Messages/MessagesActions'

export default createEpicMiddleware(combineEpics(
  checkOnlineStatus,
  loginEpic,
  registerEpic,
  requestForgotPasswordEpic,
  requestResetPasswordEpic,
  logoutEpic,
  profileEpic,
  fetchContactsEpic,
  addContactEpic,
  requestUsersEpic,
  channelsEpic,
  loadInitialChannelsEpic,
  updateChannelsEpic,
  newMessageInChannelEpic,
  createChannelEpic,
  createPrivateChannelEpic,
  joinChannelEpic,
  leaveChannelEpic,
  messagesEpic,
  loadInitialMessagesEpic,
  incomingMessageEpic,
  broadcastMessageEpic
))
