import React from 'react'
import { connect } from 'react-redux'
import { 
  Route
} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Channels from '../Channels/Channels'
import Messages from '../Messages/Messages'
import ProfileBar from '../Profile/ProfileBar'
import Account from '../Account/Account'
import Contacts from '../Contacts/Contacts'
import AddContact from '../Contacts/AddContact'
import AddChannel from '../Channels/AddChannel'
import {
  requestChannels
} from '../Channels/ChannelsActions'

class Main extends React.Component {
  componentWillMount() {
    const { requestChannels } = this.props.actions
    requestChannels()
  }

  componentWillUnmount() {
    const { socket } = this.props
    socket.disconnect()
  }

  render() {
    const { currentUser, selectedChannel, messagesInView, channelsInView } = this.props

    const displayMessages = messagesInView ? 'db flex-auto' : 'dn'
    const displayChannels = channelsInView ? 'db flex-auto' : 'dn'
    return (
      <div className='flex flex-auto w-100 h-100'>
        <div className={`${displayChannels} mw6-l db-l mnw-450-l h-100`}>
          <div className={`flex flex-column h-100`}>
            <ProfileBar user={currentUser}/>
            <Route path='/chat/account' component={Account}/> 
            <Route exact path='/chat/channels/add' component={AddChannel}/>
            <Route exact path='/chat' component={Channels}/>
            <Route exact path='/chat/contacts/add' component={AddContact}/>
            <Route exact path='/chat/contacts' component={Contacts}/> 
          </div>
        </div>
          <div className={`${displayMessages} db-l flex-auto`}>
            <Messages channel={selectedChannel} />
          </div>

      </div>
    )
  }
}

export default connect(
  s => ({
    currentUser: s.currentUser,
    channelsInView: s.channelsInView,
    messagesInView: s.messagesInView,
    selectedChannel: s.selectedChannel,
    socket: s.channelsSocket
  }),
  dispatch => ({ actions: bindActionCreators({ requestChannels }, dispatch) })
)(Main)
