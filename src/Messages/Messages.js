import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// getSocket from '../socket'
import ChannelBar from './ChannelBar'
import MessageBubble from './MessageBubble'
import MessageInput from './MessageInput'
import bkg from '../images/confectionary.png'
import { toggleMessagesInView, toggleChannelsInView } from '../Main/MainActions'
import { requestChat, joinChannel, leaveChannel, broadcastMessage } from './MessagesActions'

class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //text: '',
      height: props.height || 500
    }
  }

  componentWillMount() {
    const { requestChat } = this.props.actions
    requestChat()
  }

  componentDidMount() {
    this.updateMessageWindowHeight();
    window.addEventListener('resize', this.updateMessageWindowHeight)
    this.scrollToBottom()
  }

  componentWillUpdate(nextprops) {
    const { joinChannel, leaveChannel } = this.props.actions
    const { channel, socket } = nextprops
    if(channel._id !== this.props.channel._id) {
      leaveChannel({ socket, channelId: this.props.channel._id})
      joinChannel({ socket, channelId: channel._id})
    }
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  componentWillUnmount() {
    const { socket } = this.props
    socket.disconnect()
    window.removeEventListener('resize', this.updateMessageWindowHeight)
  }

  updateMessageWindowHeight = () => {
    this.setState({ height: window.innerHeight - 110 + 'px' })
  }

  broadcast = ({ message }) => {
    const { socket, channel } = this.props
    const { broadcastMessage } = this.props.actions
    broadcastMessage({
      socket,
      channelId: channel._id,
      message,
      cb: this.confirmMessage
    })
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  confirmMessage = res => {
    if(res.error) return console.log(res.error)
    console.log(res)
  }

  switchViewToChannels = () => {
    const { toggleMessagesInView, toggleChannelsInView } = this.props.actions
    toggleMessagesInView(false)
    toggleChannelsInView(true)
  }

  //handleInput = event => this.setState({ text: event.target.value })

  render() {
    const { channel, currentUser, channelsInView, messages } = this.props

    const { height } = this.state
    return (
      <div className='flex flex-column'>
        <ChannelBar
          channel={channel}
          channelsInView={channelsInView}
          switchToChannels={this.switchViewToChannels}
          currentUser={currentUser}
        />
        <div
          style={{
            background: `url(${bkg})`,
            height: height
          }}
          className='relative'
        >
          <div className='overflow-y-scroll h-100'>
            <div className='w-100'>
            { messages.length > 0
                ? messages.map((m, i) => <MessageBubble key={i} message={m} currentUser={currentUser} />) 
                : ''
            }
            </div>
            <div
              style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>
        </div>
        <div className='bg-white' style={{ height: '50px'}}>
          <MessageInput onSubmit={this.broadcast}/>
        </div>
      </div>
    )
  }
}

export default connect(
  s => ({
    currentUser: s.currentUser,
    channelsInView: s.channelsInView,
    messages: s.messages,
    socket: s.chatSocket
  }),
  dispatch => ({
    actions: bindActionCreators({
      toggleChannelsInView,
      toggleMessagesInView,
      requestChat,
      joinChannel,
      leaveChannel,
      broadcastMessage
    }, dispatch)
  })
)(Messages)
