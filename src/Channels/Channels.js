import React from 'react'
//import openSocket from 'socket.io-client'
//import { loadChannels } from './actions.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { 
  Route
} from 'react-router-dom'
import AddChannel from '../Channels/AddChannel'
import ChannelsList from './ChannelsList'
import Contacts from '../Contacts/Contacts'

//import { getLocalToken } from '../client/api'
//import getSocket from '../socket'
import {
  requestChannels,
  resetUnreadMessages,
  setSelectedChannel
} from './ChannelsActions'

import { toggleMessagesInView, toggleChannelsInView } from '../Main/MainActions'
//let socket
//let token

class Channel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  createChannel = channelName => {
    const { socket } = this.props
    socket.emit('createChannel', channelName)
  }

  handleInput = event =>
    this.setState({ text: event.target.value })

  selectChannel = ({ channel }) => {
    const { actions } = this.props
    const { resetUnreadMessages, setSelectedChannel, toggleMessagesInView, toggleChannelsInView } = actions
    resetUnreadMessages(channel._id)
    setSelectedChannel(channel)
    toggleChannelsInView(false)
    toggleMessagesInView(true)
  }

  render() {
    const { channels, latestMessages, selectedChannel, currentUser } = this.props
    console.log(latestMessages)
    return (
      <div className='h-100'>
        
        { (channels.length !== 0) &&
          <ChannelsList
            selectedChannel={selectedChannel}
            onItemClick={this.selectChannel}
            channels={channels}
            latestMessages={latestMessages}
            currentUser={currentUser}
          />
        }
        { 
          channels.length === 0 
            ? <Contacts/>
            : ''
        }
      </div>
    )
  }
}

export default connect(
  s => ({
    channels: s.channels,
    latestMessages: s.latestMessages,
    selectedChannel: s.selectedChannel,
    socket: s.channelsSocket,
    currentUser: s.currentUser,
  }),
  dispatch => ({
    actions: bindActionCreators({
        requestChannels,
        resetUnreadMessages,
        setSelectedChannel,
        toggleMessagesInView,
        toggleChannelsInView
      }, dispatch)
  })
)(Channel)
